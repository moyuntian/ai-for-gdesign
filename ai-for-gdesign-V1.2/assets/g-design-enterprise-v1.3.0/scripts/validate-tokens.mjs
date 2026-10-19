import{readFile,readdir}from'node:fs/promises';import{join,relative}from'node:path'
const root=new URL('../',import.meta.url).pathname
const walk=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(x=>x.isDirectory()?walk(join(dir,x.name)):join(dir,x.name)))).flat()
const files=(await walk(join(root,'tokens'))).filter(f=>/\.(css|scss)$/.test(f))
const bad=[]
for(const file of files){
  const text=await readFile(file,'utf8')
  for(const m of text.matchAll(/#[0-9a-zA-Z]+|rgba?\([^)]*\)/g)){
    const v=m[0]
    if(v.startsWith('#')&&!/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v))bad.push(`${relative(root,file)}: ${v}`)
    if(v.startsWith('rgb')){
      const n=v.slice(v.indexOf('(')+1,-1).split(',').map(x=>Number(x.trim()))
      if(n.some(Number.isNaN)||n.slice(0,3).some(x=>x<0||x>255)||(n.length===4&&(n[3]<0||n[3]>1)))bad.push(`${relative(root,file)}: ${v}`)
    }
  }
}
if(bad.length)throw new Error('Invalid tokens\n'+bad.join('\n'))
console.log(`Token validation passed: ${files.length} files`)
