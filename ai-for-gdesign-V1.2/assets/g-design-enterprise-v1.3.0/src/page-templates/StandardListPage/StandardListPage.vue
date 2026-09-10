<template><PageStateShell :state="state" @retry="$emit('retry')">
  <main class="page"><h1>标准查询列表</h1>
    <GSearchBar v-model="query" @search="search" @reset="query=''"/>
    <GDataTablePro :data="filtered" :columns="columns" :total="filtered.length">
      <template #toolbar><GButton type="primary">新建</GButton></template>
    </GDataTablePro>
  </main>
</PageStateShell></template>
<script setup lang="ts">import{PageStateShell}from'../../page-states';import type{PageState}from'../../page-states';const{state='ready'}=defineProps<{state?:PageState}>();defineEmits<{(e:'retry'):void}>();
import{computed,ref}from'vue';import{GButton}from'../../components/basic/GButton';import{GSearchBar}from'../../components/business/GSearchBar';import{GDataTablePro}from'../../components/business/GDataTablePro'
const query=ref(''),applied=ref('');const search=()=>applied.value=query.value
const rows=[{name:'核心交换机',type:'网络设备',status:'正常'},{name:'边缘网关',type:'网关',status:'告警'}]
const columns=[{prop:'name',label:'名称'},{prop:'type',label:'类型'},{prop:'status',label:'状态'}]
const filtered=computed(()=>rows.filter(x=>x.name.includes(applied.value)))
;</script>
