<template><section class="g-metric"><span>{{title}}</span><strong>{{value}}</strong><small :class="trend==='down'?'down':'up'">{{delta}}</small></section></template>
<script setup lang="ts">defineProps<{title:string;value:string|number;delta?:string;trend?:'up'|'down'}>();</script>
<style scoped>.g-metric{background:var(--g-bg-surface);border:1px solid var(--g-border);border-radius:8px;padding:16px;display:grid;gap:8px}.g-metric span{color:var(--g-text-secondary)}.g-metric strong{font-size:28px}.up{color:var(--g-success)}.down{color:var(--g-urgent)}</style>
