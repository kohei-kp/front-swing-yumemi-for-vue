<script setup lang="ts">
import { computed } from 'vue'
import Highcharts from 'highcharts/es-modules/masters/highcharts.src'
import { Chart } from 'highcharts-vue'

type Props = {
  series: Highcharts.LineChartSeriesOptions[]
  title: string
}

const props = defineProps<Props>()
const options: Highcharts.ChartOptions = {
  chart: {
    type: 'line'
  }
}

const chartOptions = computed(() => {
  return {
    ...options,
    title: {
      text: props.title
    },
    series: [...props.series]
  }
})
</script>

<template>
  <div>
    <chart :options="chartOptions" :update-args="[true, true, true]" />
  </div>
</template>

<style scoped>
.chart {
  wdith: 80vw;
}
</style>
