#!/usr/bin/env node
// copy-components.mjs
// Copies specific components from the assets package into the workspace.
// Run AFTER init.mjs, once you know which components the page needs.
//
// Usage:
//   node copy-components.mjs --dir "<workspace>" --components GMetricCard,GStatusTag,GSearchBar
//   node copy-components.mjs --dir "<workspace>" --components GMetricCard GStatusTag GSearchBar
//
// Output (agent-parseable):
//   RESULT: OK
//   COPIED: GMetricCard, GStatusTag, GSearchBar
//   RESULT: FAIL | <reason>

import { existsSync, statSync, readdirSync, cpSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);

function getOpt(name) {
  const idx = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (idx === -1) return undefined;
  const val = args[idx];
  if (val.includes('=')) return val.split('=')[1];
  return args[idx + 1];
}

const dir = getOpt('dir');
const compsArg = getOpt('components');

if (!dir) {
  console.log('RESULT: FAIL | Missing --dir');
  process.exit(1);
}
if (!compsArg) {
  console.log('RESULT: FAIL | Missing --components (comma-separated or space-separated names)');
  process.exit(1);
}

// Parse component names (support "A,B,C", "A B C", "--components=A,B", single "A")
let compNames;
if (compsArg.includes(',')) {
  compNames = compsArg.split(',').map((s) => s.trim()).filter(Boolean);
} else {
  const startIdx = args.indexOf(compsArg);
  compNames = [compsArg, ...args.slice(startIdx + 1)].filter((a) => !a.startsWith('--'));
}

if (compNames.length === 0) {
  console.log('RESULT: FAIL | No component names provided');
  process.exit(1);
}

const root = resolve(dir);
const srcDir = join(root, 'src');
const compsDest = join(srcDir, 'components');

if (!existsSync(srcDir)) {
  console.log(`RESULT: FAIL | src/ not found: ${srcDir}`);
  process.exit(1);
}

// Resolve assets root (same logic as init.mjs)
let assetsRoot;
const skillsDir = resolve(__dirname, '..');
const packageDir = resolve(skillsDir, '..');
const parentDir = resolve(packageDir, '..');
const assetsDir = join(parentDir, 'assets');
if (existsSync(assetsDir)) {
  const entries = readdirSync(assetsDir).filter((n) => n.startsWith('g-design-enterprise'));
  if (entries.length > 0) {
    assetsRoot = join(assetsDir, entries[0]);
  }
}

if (!assetsRoot || !existsSync(assetsRoot)) {
  console.log('RESULT: FAIL | assets package not found');
  process.exit(1);
}

const compsSrc = join(assetsRoot, 'src', 'components');
if (!existsSync(compsSrc)) {
  console.log('RESULT: FAIL | assets components dir not found');
  process.exit(1);
}

mkdirSync(compsDest, { recursive: true });

// Build index: ComponentName → category dir
const index = {};
for (const cat of readdirSync(compsSrc, { withFileTypes: true })) {
  if (!cat.isDirectory()) continue;
  for (const comp of readdirSync(join(compsSrc, cat.name), { withFileTypes: true })) {
    if (comp.isDirectory() && /^[A-Z]/.test(comp.name)) {
      index[comp.name] = cat.name;
    }
  }
}

const copied = [];
const missing = [];
for (const name of compNames) {
  const cat = index[name];
  if (!cat) {
    missing.push(name);
    continue;
  }
  const src = join(compsSrc, cat, name);
  const dest = join(compsDest, name);
  if (existsSync(dest)) {
    copied.push(`${name}(skip)`);
    continue;
  }
  cpSync(src, dest, { recursive: true });
  copied.push(name);
}

if (missing.length > 0) {
  const available = Object.keys(index).sort().join(', ');
  console.log(`RESULT: FAIL | Unknown components: ${missing.join(', ')} — available: ${available}`);
  process.exit(1);
}

console.log('RESULT: OK');
console.log(`COPIED: ${copied.join(', ')}`);
process.exit(0);
