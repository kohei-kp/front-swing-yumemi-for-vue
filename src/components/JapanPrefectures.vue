<script setup lang="ts">
import { Prefectures } from '@/common/api'

type Props = {
  prefectures: Prefectures
}

defineProps<Props>()

type Emits = {
  (e: 'change', value: number): void
  (e: 'update:value', value: number): void
}
const emit = defineEmits<Emits>()

function handleChange(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  emit('change', value)
  emit('update:value', value)
}
</script>

<template>
  <section class="prefecture-wrapper">
    <h1>都道府県</h1>
    <label v-for="prefecture in prefectures" :key="prefecture.prefCode" class="prefecture">
      <input
        type="checkbox"
        :value="prefecture.prefCode"
        :for="`prefcode-${prefecture.prefCode}`"
        @change="handleChange"
      />
      {{ prefecture.prefName }}
    </label>
  </section>
</template>

<style scoped>
.prefecture {
  display: inline-block;
  width: 90px;
}

@media screen and (min-width: 768px) {
  .prefecture-wrapper {
    min-width: 768px;
  }
}
@media screen and (min-width: 1024px) {
  .prefecture-wrapper {
    min-width: 1024px;
  }
}
</style>
