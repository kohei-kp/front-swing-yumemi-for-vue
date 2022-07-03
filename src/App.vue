<script setup lang="ts">
import api, { Prefecture, PopulationCompositonParams, PopulationComposition } from './common/api';
import { ref, onMounted } from 'vue';
import JapanPrefectures from './components/JapanPrefectures.vue';
import PopulationChart from './components/PopulationChart.vue';
import Highcharts from 'highcharts';

const prefectures = ref<Prefecture[]>([]);
const graphSeries = ref<Highcharts.SeriesLineOptions[]>([]);
const prefCodes = ref<number[]>([]);

const fetchPrefectures = async () => {
  prefectures.value = (await api.prefectures()).result;
};

const fetchPopulation = async (prefCode: number) => {
  const result = await api.populationComposition({ prefCode } as PopulationCompositonParams);
  return result.result.data.find((v) => v.label === '総人口')?.data ?? [];
};

const handleChange = async (value: number) => {
  if (prefCodes.value.includes(value)) {
    prefCodes.value = prefCodes.value.filter((prefCode) => prefCode !== value);
    graphSeries.value = graphSeries.value.filter((series) => series.custom?.prefCode !== value);
  } else {
    prefCodes.value.push(value);
    const res = await fetchPopulation(value);
    const series: Highcharts.SeriesLineOptions = {
      type: 'line',
      name: prefectures.value.find((v) => v.prefCode === value)?.prefName,
      custom: { prefCode: value },
      data: res.map((v) => ({ x: v.year, y: v.value })),
    };

    graphSeries.value.push(series);
  }
};

onMounted(() => {
  fetchPrefectures();
});
</script>

<template>
  <div class="app-wrapper">
    <JapanPrefectures :prefectures="prefectures" @change="handleChange" style="margin: 0 auto" />
    <PopulationChart :series="graphSeries" style="margin: 0 auto" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-wrapper {
  padding: 10px;
}
</style>
