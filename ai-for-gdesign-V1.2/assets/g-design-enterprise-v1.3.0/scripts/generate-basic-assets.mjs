import{mkdir,writeFile}from'node:fs/promises';import{join}from'node:path'
const root=new URL('../src/components/basic/',import.meta.url).pathname
const visual=[
  ['GLink','ElLink','link','导航与文字操作'],
  ['GTextarea','ElInput','input','多行文本录入',':type="\'textarea\'"'],
  ['GInputNumber','ElInputNumber','input','数字录入'],
  ['GSelect','ElSelect','selection','单项或多项选择'],
  ['GCascader','ElCascader','selection','层级数据选择'],
  ['GTreeSelect','ElTreeSelect','selection','树形数据选择'],
  ['GCheckbox','ElCheckbox','selection','多项选择'],
  ['GRadio','ElRadio','selection','单项选择'],
  ['GSwitch','ElSwitch','selection','二元状态切换'],
  ['GDatePicker','ElDatePicker','date-time','日期选择'],
  ['GTimePicker','ElTimePicker','date-time','时间选择'],
  ['GTag','ElTag','feedback','状态和分类标记'],
  ['GBadge','ElBadge','feedback','数量与提醒标记'],
  ['GTooltip','ElTooltip','feedback','悬停辅助说明'],
  ['GDialog','ElDialog','overlay','模态任务'],
  ['GDrawer','ElDrawer','overlay','侧向详情与编辑'],
  ['GPopover','ElPopover','overlay','轻量浮层'],
  ['GForm','ElForm','form','结构化表单'],
  ['GPagination','ElPagination','data','分页导航'],
  ['GTabs','ElTabs','navigation','同层内容切换'],
  ['GMenu','ElMenu','navigation','功能导航'],
  ['GBreadcrumb','ElBreadcrumb','navigation','层级路径'],
  ['GSteps','ElSteps','navigation','流程进度'],
  ['GAlert','ElAlert','feedback','页内反馈'],
  ['GEmpty','ElEmpty','state','空数据状态'],
  ['GSkeleton','ElSkeleton','state','内容加载占位'],
  ['GResult','ElResult','state','任务结果反馈'],
  ['GUpload','ElUpload','input','文件上传'],
  ['GTransfer','ElTransfer','selection','双栏数据穿梭'],
  ['GTree','ElTree','data','层级数据树'],
  ['GTreeV2','ElTreeV2','data','大数据虚拟树'],
  ['GAutocomplete','ElAutocomplete','input','输入建议与自动补全'],
  ['GDropdown','ElDropdown','navigation','下拉操作菜单'],
  ['GPopconfirm','ElPopconfirm','feedback','危险操作二次确认'],
  ['GProgress','ElProgress','feedback','任务进度展示'],
  ['GCollapse','ElCollapse','data','分组内容折叠']
]
const vue=(name,base,extra='')=>`<template><${base} v-bind="$attrs" ${extra}><template v-for="(_,slot) in $slots" #[slot]="scope"><slot :name="slot" v-bind="scope||{}"/></template></${base}></template>
<script setup lang="ts">import{${base}}from'element-plus';</script>
<style scoped src="./style.scss"></style>
`
for(const[name,base,category,description,extra]of visual){
  const dir=join(root,name);await mkdir(dir,{recursive:true})
  await writeFile(join(dir,`${name}.vue`),vue(name,base,extra))
  await writeFile(join(dir,'index.ts'),`import ${name} from './${name}.vue';export{${name}};export default ${name}\n`)
  await writeFile(join(dir,'types.ts'),`export interface ${name}Meta{category:'${category}';base:'${base}'}\n`)
  await writeFile(join(dir,'style.scss'),`:deep(.el-${category}){font-family:var(--g-font-family)}\n`)
  await writeFile(join(dir,'metadata.json'),JSON.stringify({id:name.replace(/^G/,'g-').replace(/[A-Z]/g,m=>'-'+m.toLowerCase()).replace('g--','g-'),name,level:'basic',category,base,description,themes:['light','dark'],states:['default','hover','active','focus','disabled']},null,2)+'\n')
  await writeFile(join(dir,'README.md'),`# ${name}\n\n${description}。基于 ${base}，保持 Element Plus 2.13.5 的属性、事件与插槽习惯，并使用 G Design语义Token。\n`)
  await writeFile(join(dir,'examples.vue'),`<template><${name} aria-label="${description}">示例</${name}></template>\n<script setup lang="ts">import{${name}}from'./index';</script>\n`)
}
const services=[
  ['GMessage','ElMessage','即时操作反馈'],
  ['GNotification','ElNotification','系统级通知'],
  ['GLoading','ElLoading','全局或局部加载']
]
for(const[name,base,description]of services){
  const dir=join(root,name);await mkdir(dir,{recursive:true})
  const body=name==='GLoading'
    ?`import{ElLoading}from'element-plus';export const GLoading={service:ElLoading.service,directive:ElLoading.directive};export default GLoading\n`
    :`import{${base}}from'element-plus';export const ${name}=${base};export default ${name}\n`
  await writeFile(join(dir,'index.ts'),body)
  await writeFile(join(dir,'types.ts'),`export type ${name}Service=typeof import('element-plus')['${base}']\n`)
  await writeFile(join(dir,'metadata.json'),JSON.stringify({id:name.toLowerCase(),name,level:'basic',category:'service',base,description,themes:['light','dark'],api:'function'},null,2)+'\n')
  await writeFile(join(dir,'README.md'),`# ${name}\n\n${description}。函数式API沿用 Element Plus 2.13.5，并由G Design主题变量控制视觉。\n`)
  await writeFile(join(dir,'examples.ts'),`import{${name}}from'./index';export const showExample=()=>${name}${name==='GLoading'?'.service({text:\'加载中…\'})':'.success(\'操作成功\')'}\n`)
}
const allNames=['GButton','GLink','GIcon','GInput','GTable',...visual.map(x=>x[0]).filter(x=>x!=='GLink'),...services.map(x=>x[0])]
await writeFile(join(root,'index.ts'),allNames.map(name=>`export{${name}}from'./${name}'`).join('\n')+'\n')
console.log(`Generated ${visual.length+services.length} basic assets`)
