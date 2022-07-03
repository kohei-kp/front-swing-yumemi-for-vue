<script setup lang="ts">
import { Prefecture } from '../common/api';

type Props = {
  prefectures: Prefecture[];
};

defineProps<Props>();

type Emits = {
  (e: 'change', value: number): void;
  (e: 'update:value', value: number): void;
};
const emit = defineEmits<Emits>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('change', Number(target.value));
  emit('update:value', Number(target.value));
};
</script>

<template>
  <section class="prefectures">
    <h1>都道府県</h1>
    <label
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      :for="String(prefecture.prefCode)"
      @change="handleChange"
      class="prefecture"
    >
      <input type="checkbox" :id="String(prefecture.prefCode)" :value="prefecture.prefCode" />
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
