<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ChartOptions, SeriesLineOptions } from 'highcharts';

type Props = {
  series: SeriesLineOptions[];
};

const props = defineProps<Props>();

const options: ChartOptions = {};

const chartOptions = computed(() => {
  return {
    options,
    series: [...props.series],
  };
});
</script>

<template>
  <highcharts :options="chartOptions" />
</template>

<style scoped></style>
