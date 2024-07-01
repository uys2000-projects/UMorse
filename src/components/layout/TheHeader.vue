<script lang="ts">
import NavigateButton from '../shared/NavigateButton.vue';
export default {
  components: {
    NavigateButton
  }
}
</script>

<template>
  <div class="navbar mobile desktop">
    <div class="flex w-full justify-around lg:hidden">
      <NavigateButton icon="draw" link="/" />
      <NavigateButton icon="local_library" link="/diary" />
      <NavigateButton icon="tune" link="/settings" />
    </div>
    <div class="desktop-menu">
      <span class="p-2">
        UMorse
      </span>
      <ul class="menu menu-horizontal">
        <li>
          <NavigateButton icon="draw" link="/" />
        </li>
        <li>
          <NavigateButton icon="local_library" link="/diary" />
        </li>
        <li>
          <NavigateButton icon="tune" link="/settings" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  @apply bg-neutral text-neutral-content order-1;
}

.navbar.mobile {
  @apply w-[calc(100%-2rem)] rounded-box fixed bottom-4 mx-4
}

.navbar .mobile-menu {
  @apply flex w-full justify-around lg:hidden;
}

.navbar.desktop {
  @apply lg:sticky lg:top-4 lg:bottom-0 lg:mt-4
}

.navbar .desktop-menu {
  @apply hidden w-full lg:flex justify-between;
}
</style>