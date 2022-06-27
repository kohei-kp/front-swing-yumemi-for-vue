<script setup lang="ts">
import { Prefecture } from '../common/api';

type Props = {
  prefectures: Prefecture[];
};

defineProps<Props>();
</script>

<template>
  <section class="prefectures">
    <h1>都道府県</h1>
    <label
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      :for="String(prefecture.prefCode)"
      class="prefecture"
    >
      <input type="checkbox" :id="prefecture.prefCode" />
      {{ prefecture.prefName }}
    </label>
  </section>
</template>

<style scoped>
.prefecture {
  display: inline-block;
  width: 90px;
}

@media screen and (min-width: 600px) {
  .prefectures {
    max-width: 600px;
  }
}
@media screen and (min-width: 1025px) {
  .prefectures {
    max-width: 1025px;
  }
}
</style>
