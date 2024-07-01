<template>
  <RouterLink :to="link" class="btn btn-square btn-ghost">
    <span class="material-symbols-rounded">
      {{ icon }}
    </span>
  </RouterLink>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  props: {
    icon: {
      type: String,
      default: 'draw'
    },
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>