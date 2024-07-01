<template>
  <label class="label cursor-pointer">
    <span class="label-text">{{ title }}</span>
    <input type="checkbox" class="toggle toggle-primary" v-model="_value" />
  </label>
</template>

<script lang="ts">
export default {
  emits: ["update:value"],
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    value: {
      type: Boolean
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(value: boolean) {
        this.$emit("update:value", value)
      }
    }
  }
}
</script>