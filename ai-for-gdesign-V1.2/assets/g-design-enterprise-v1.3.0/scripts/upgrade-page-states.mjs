import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
const root = new URL('../src/page-templates/', import.meta.url).pathname
for (const name of await readdir(root)) {
  const dir = join(root, name)
  const file = join(dir, name + '.vue')
  let source
  try { source = await readFile(file, 'utf8') } catch { continue }
  source = source.replace('<template>', '<template><PageStateShell :state="state" @retry="$emit(\'retry\')">')
  const end = source.lastIndexOf('</template>')
  source = source.slice(0, end) + '</PageStateShell>' + source.slice(end)
  const setup = '<script setup lang="ts">import{PageStateShell}from\'../../page-states\';import type{PageState}from\'../../page-states\';const{state}=withDefaults(defineProps<{state?:PageState}>(),{state:\'ready\'});defineEmits<{(e:\'retry\'):void}>();'
  source = source.replace('<script setup lang="ts">', setup)
  await writeFile(file, source)
  const metaFile = join(dir, 'metadata.json')
  const meta = JSON.parse(await readFile(metaFile, 'utf8'))
  meta.pageStates = ['loading', 'empty', 'error', 'forbidden', 'partial', 'ready']
  meta.feedback = ['save-success', 'save-failure', 'delete-confirm', 'batch-result']
  await writeFile(metaFile, JSON.stringify(meta, null, 2) + '\n')
}
console.log('Upgraded all page templates with shared state handling')
