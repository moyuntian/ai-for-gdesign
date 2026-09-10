<template>
  <section class="topology">
    <header><strong>{{title}}</strong><el-button-group><el-button @click="zoom=Math.min(1.8,zoom+.1)">＋</el-button><el-button @click="zoom=Math.max(.5,zoom-.1)">－</el-button><el-button @click="zoom=1">适应</el-button></el-button-group></header>
    <svg viewBox="0 0 800 420" role="img" aria-label="拓扑关系图">
      <g :transform="`translate(${400-400*zoom} ${210-210*zoom}) scale(${zoom})`">
        <line v-for="e in edges" :key="e.id||e.source+e.target" v-bind="line(e)" :class="['edge',e.status,e.flow&&'flow']"/>
        <g v-for="n in nodes" :key="n.id" class="node" :class="[n.status,selected===n.id&&'selected']" :transform="`translate(${n.x} ${n.y})`" tabindex="0" @click="select(n.id)" @keyup.enter="select(n.id)">
          <circle r="26"/><text y="45" text-anchor="middle">{{n.label}}</text><text y="5" text-anchor="middle" class="kind">{{n.kind||'节点'}}</text>
        </g>
      </g>
    </svg>
    <footer><span v-for="i in legend" :key="i.s"><i :class="i.s"/>{{i.l}}</span></footer>
  </section>
</template>
<script setup lang="ts">
import{ref}from'vue';import type{TopologyNode,TopologyEdge}from'./types'
const p=withDefaults(defineProps<{title?:string;nodes:TopologyNode[];edges:TopologyEdge[]}>(),{title:'拓扑视图'})
const emit=defineEmits<{(e:'select',id:string):void}>();const zoom=ref(1),selected=ref('')
const byId=(id:string)=>p.nodes.find(n=>n.id===id)
const line=(e:TopologyEdge)=>({x1:byId(e.source)?.x,y1:byId(e.source)?.y,x2:byId(e.target)?.x,y2:byId(e.target)?.y})
const select=(id:string)=>{selected.value=id;emit('select',id)}
const legend=[{s:'success',l:'正常'},{s:'warning',l:'告警'},{s:'danger',l:'严重'},{s:'offline',l:'离线'}]
;</script>
<style scoped>
.topology{border:1px solid var(--g-border);border-radius:8px;background:var(--g-bg-surface);color:var(--g-text-primary)}header,footer{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--g-border)}footer{justify-content:flex-start;gap:20px;border:0;border-top:1px solid var(--g-border);font-size:12px}.topology svg{width:100%;min-height:420px;background:var(--g-bg-page)}.edge{stroke:var(--g-border);stroke-width:2}.edge.warning{stroke:var(--g-warning)}.edge.danger{stroke:var(--g-urgent);stroke-width:3}.edge.flow{stroke-dasharray:8 5;animation:flow 1s linear infinite}.node circle{fill:var(--g-topology-node-normal);stroke:var(--g-bg-surface);stroke-width:4}.node.success circle{fill:var(--g-success)}.node.warning circle{fill:var(--g-warning)}.node.danger circle{fill:var(--g-urgent)}.node.offline circle{fill:var(--g-text-disabled)}.node.selected circle{stroke:var(--g-focus);stroke-width:7}.node text{fill:var(--g-text-primary);font-size:13px}.node .kind{fill:white;font-size:10px}footer i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background:var(--g-accent)}footer i.success{background:var(--g-success)}footer i.warning{background:var(--g-warning)}footer i.danger{background:var(--g-urgent)}footer i.offline{background:var(--g-text-disabled)}@keyframes flow{to{stroke-dashoffset:-13}}
</style>
