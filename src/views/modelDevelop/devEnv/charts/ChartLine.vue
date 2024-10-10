<script setup lang="ts">
import { type PropType, ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

const props = defineProps({
  category: [],
  color: {
    type: String,
    default: "blue"
  },
  series: []
});

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme,
  renderer: "svg"
});

setOptions({
  container: ".line-card",
  xAxis: {
    type: "category",
    show: true,
    data: props.category
  },
  tooltip: {},
  yAxis: {
    show: true,
    type: "value"
  },
  series: props.series
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%" />
</template>
