<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  value: string
}
const props = defineProps<Props>()

type Emits = {
  (e: 'change', value: string): void
  (e: 'update:value', value: string): void
}
const emit = defineEmits<Emits>()

const localValue = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:value', value)
  }
})

function handleChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  emit('change', value)
}
</script>

<template>
  <div>
    <select v-model="localValue" @change="handleChange">
      <option value="total-population">総人口</option>
      <option value="youth-population">年少人口</option>
      <option value="working-age-population">生産年齢人口</option>
      <option value="elderly-population">老年人口</option>
    </select>
  </div>
</template>
