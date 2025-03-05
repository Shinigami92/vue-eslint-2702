<script lang="ts">
export type ComponentProps<
  TValueLoooooooooooooooooooooooooooooooooog = string
> = {
  value?: TValueLoooooooooooooooooooooooooooooooooog;
};
</script>

<script
  setup
  lang="ts"
  generic="TValueLoooooooooooooooooooooooooooooooooog = string"
>
const props = withDefaults(
  defineProps<ComponentProps<TValueLoooooooooooooooooooooooooooooooooog>>(),
  {
    value: "default",
  }
);
</script>

<template>
  <span>{{ props.value }}</span>
</template>
