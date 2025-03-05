<script lang="ts">
export type ComponentProps<TValue = string> = {
  value?: TValue;
};
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ComponentProps>(), {
  value: "default",
});
</script>

<template>
  <span>{{ props.value }}</span>
</template>
