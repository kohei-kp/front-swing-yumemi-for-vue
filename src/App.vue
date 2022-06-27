<script setup lang="ts">
import api, { Prefecture } from './common/api';
import { ref, onMounted } from 'vue';
import JapanPrefectures from './components/JapanPrefectures.vue';

const prefectures = ref<Prefecture[]>([]);

const fetchPrefectures = async () => {
  prefectures.value = (await api.prefectures()).result;
};

onMounted(() => {
  fetchPrefectures();
});
</script>

<template>
  <div class="app-wrapper">
    <JapanPrefectures :prefectures="prefectures" />
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
  display: flex;
  justify-content: center;
}
</style>
