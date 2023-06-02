<script setup lang="ts">
import JapanPrefectures from '@/components/JapanPrefectures.vue'
import StatisticSelector from '@/components/StatisticSelector.vue'
import PopulationChart from '@/components/PopulationChart.vue'
import { ref, computed, onMounted } from 'vue'
import api, { PopulationCompositionParams, Prefectures } from '@/common/api'
import Highcharts from 'highcharts/es-modules/masters/highcharts.src'

type PopulationTypes =
  | 'total-population'
  | 'youth-population'
  | 'working-age-population'
  | 'elderly-population'
type GraphSerins = {
  [P in PopulationTypes]: Highcharts.SeriesLineOptions[]
}

const populationTypes = [
  'total-population',
  'youth-population',
  'working-age-population',
  'elderly-population'
] as const

const graphSeries = ref<GraphSerins>({
  'total-population': [],
  'youth-population': [],
  'working-age-population': [],
  'elderly-population': []
})

const prefectures = ref<Prefectures>([])
const prefCodes = ref<number[]>([])
const selectedPopulation = ref<PopulationTypes>('total-population')

const series = computed(() => graphSeries.value[selectedPopulation.value])
const chartTitle = computed(() => {
  switch (selectedPopulation.value) {
    case 'total-population':
      return '総人口'
    case 'youth-population':
      return '年少人口'
    case 'working-age-population':
      return '生産年齢人口'
    case 'elderly-population':
      return '老年人口'
    default:
      return ''
  }
})

async function fetchPrefectures() {
  const res = await api.prefectures()
  prefectures.value = res.result
}

async function fetchPopulation(prefCode: number): Promise<GraphSerins> {
  const res = await api.populationComposition({ prefCode } as PopulationCompositionParams)
  const resultData = res.result.data

  return {
    'total-population': resultData.find((v) => v.label === '総人口')?.data ?? [],
    'youth-population': resultData.find((v) => v.label === '年少人口')?.data ?? [],
    'working-age-population': resultData.find((v) => v.label === '生産年齢人口')?.data ?? [],
    'elderly-population': resultData.find((v) => v.label === '老年人口')?.data ?? []
  }
}

async function handleChange(value: number) {
  if (prefCodes.value.includes(value)) {
    prefCodes.value = prefCodes.value.filter((prefCode) => prefCode !== value)
    populationTypes.forEach((key) => {
      graphSeries.value[key] = graphSeries.value[key].filter(
        (series) => series.custom?.prefCode !== value
      )
    })
  } else {
    prefCodes.value.push(value)
    const res = await fetchPopulation(value)
    const prefName = prefectures.value.find((pref) => pref.prefCode === value)?.prefName
    populationTypes.forEach((key) => {
      const series: Highcharts.SeriesLineOptions = {
        type: 'line',
        name: prefName,
        custom: { prefCode: value },
        data: res[key].map((v) => ({ x: v.year, y: v.value }))
      }

      graphSeries.value[key].push(series)
    })
  }
}

onMounted(() => {
  fetchPrefectures()
})
</script>

<template>
  <main>
    <JapanPrefectures :prefectures="prefectures" @change="handleChange" style="margin: 0 autp" />
    <StatisticSelector v-model:value="selectedPopulation" />
    <PopulationChart :series="series" :title="chartTitle" />
  </main>
</template>
