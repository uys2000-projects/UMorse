<template>
  <div class="collapse">
    <input type="radio" :name="name" :checked="checked" />
    <div class="collapse-title text-xl font-medium">{{ title }}</div>
    <div class="collapse-content">
      <slot />
    </div>
  </div>
</template>

<script lang=ts>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'accordion'
    }
  }
}
</script>
