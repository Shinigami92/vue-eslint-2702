<script lang="ts">
export type WuiFilterEditorListOption<
  TValue = string,
  TValueKey extends string = "value"
> = Record<TValueKey, TValue> & Partial<Record<string, unknown>>;

export interface WuiFilterEditorListProps<
  TValue = string,
  TValueKey extends string = "value"
> {
  valueField?: TValueKey;
  options: Array<WuiFilterEditorListOption<TValue, TValueKey>>;
}
</script>

<script
  setup
  lang="ts"
  generic="TValue = string, TValueKey extends string = 'value'"
>
const props = withDefaults(
  defineProps<WuiFilterEditorListProps<TValue, TValueKey>>(),
  {
    // @ts-expect-error: default is compatible with generic default
    valueField: "value",
  }
);

console.log(props);
</script>
