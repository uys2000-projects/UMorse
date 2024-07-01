<template>
  <label class="label cursor-pointer">
    <span class="label-text">{{ title }}</span>
    <template v-if="link">
      <a :href="link" target="_blank" class="label-text">{{ value }} </a>
    </template>
    <template v-else>
      <span class="label-text">{{ value }} </span>
    </template>
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
    },
    value: {
      type: String
    }
  }
}
</script>