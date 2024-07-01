<template>
  <label class="label cursor-pointer">
    <span class="label-text">{{ title }}</span>
    <a :href="link" target="_blank" class="text-primary">
      <span class="material-symbols-rounded">
        link
      </span>
    </a>
  </label>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    link: {
      type: String
    }
  }
}
</script>