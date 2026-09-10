import{readdir,readFile,stat}from'node:fs/promises';import{join}from'node:path'
const root=new URL('../',import.meta.url).pathname
const groups=['src/components/basic','src/components/business','src/components/complex','src/page-templates']
let count=0
const counts={}
for(const group of groups){
  counts[group]=0
  for(const name of await readdir(join(root,group))){
    const dir=join(root,group,name);if(!(await stat(dir)).isDirectory())continue
    const files=await readdir(dir);const implementation=files.some(f=>f.endsWith('.vue'))
    for(const required of['index.ts','metadata.json'])if(!files.includes(required))throw new Error(`${group}/${name} 缺少 ${required}`)
    const meta=JSON.parse(await readFile(join(dir,'metadata.json'),'utf8'))
    if(!implementation&&meta.api!=='function')throw new Error(`${group}/${name} 缺少 Vue 实现`)
    if(!meta.id||!meta.name)throw new Error(`${group}/${name} 元数据不完整`)
    count++;counts[group]++
  }
}
if(counts['src/components/basic']!==43)throw new Error(`基础组件应为43个，当前为${counts['src/components/basic']}`)
if(counts['src/components/business']!==13)throw new Error(`业务组件应为13个，当前为${counts['src/components/business']}`)
if(counts['src/components/complex']!==5)throw new Error(`复杂组件应为5个，当前为${counts['src/components/complex']}`)
if(counts['src/page-templates']!==6)throw new Error(`页面模板应为6个，当前为${counts['src/page-templates']}`)
const manifest=JSON.parse(await readFile(join(root,'asset-manifest.json'),'utf8'))
if(manifest.componentBase!=='element-plus@2.13.5')throw new Error('Element Plus 版本未锁定')
console.log(`Asset validation passed: ${count} independent assets`)
