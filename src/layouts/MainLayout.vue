<template>
  <div class="flex flex-col min-h-screen">
    <div
      class="fixed top-0 py-1 px-8 text-lg lg:hidden left-1/2 -translate-x-1/2 bg-neutral text-neutral-content rounded-b-lg z-10">
      UMorse
    </div>
    <div class="flex flex-col flex-grow p-6 pt-14 pb-24 lg:py-8 order-2">
      <RouterView />
    </div>
    <TheHeader />
  </div>
  <!-- Page content here -->
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from "@/components/layout/TheHeader.vue"
export default {
  components: { RouterView, TheHeader }
}
</script>