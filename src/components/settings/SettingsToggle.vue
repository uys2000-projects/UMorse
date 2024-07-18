<template>
  <label class="label cursor-pointer">
    <span class="label-text">{{ title }}</span>
    <input type="checkbox" class="toggle toggle-primary" :disabled="disabled" v-model="_value" />
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
    },
    disabled: {
      type: Boolean,
      default: false
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
  },
}
</script>