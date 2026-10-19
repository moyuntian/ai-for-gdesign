import{readFile,readdir,stat}from'node:fs/promises';import{join}from'node:path'
const root=new URL('../',import.meta.url).pathname
const nodes=JSON.parse(await readFile(join(root,'src/icons/icon-nodes.json'),'utf8'))
const aliases=JSON.parse(await readFile(join(root,'src/icons/icon-aliases.json'),'utf8'))
const iconDir=join(root,'assets/icons/lucide/icons')
const svgFiles=(await readdir(iconDir)).filter(f=>f.endsWith('.svg'))
if(svgFiles.length<2000)throw new Error(`Lucide SVG不完整：仅${svgFiles.length}个`)
for(const[name,target]of Object.entries(aliases))if(!nodes[target])throw new Error(`图标别名无效：${name} -> ${target}`)
for(const required of['assets/icons/lucide/manifest.json','assets/icons/lucide/tags.json','licenses/LUCIDE-LICENSE','licenses/THIRD-PARTY-NOTICES.md'])if(!(await stat(join(root,required))).isFile())throw new Error(`缺少离线图标文件：${required}`)
const sample=svgFiles.slice(0,50)
for(const file of sample){const svg=await readFile(join(iconDir,file),'utf8');if(/(?:href|src)=["']https?:/i.test(svg))throw new Error(`发现在线依赖：${file}`)}
console.log(`Offline icon validation passed: ${svgFiles.length} SVG files, ${Object.keys(nodes).length} canonical icons, ${Object.keys(aliases).length} aliases`)
