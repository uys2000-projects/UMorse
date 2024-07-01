<template>
  <div tabindex="0" class="collapse">
    <div class="collapse-title text-xl font-medium">{{ title }}</div>
    <div class="collapse-content">
      <slot />
    </div>
  </div>
</template>
<script lang=ts>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>