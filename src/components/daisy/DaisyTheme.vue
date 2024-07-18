<template>
  <div class="dropdown dropdown-end dropdown-bottom w-full h-full flex">
    <div tabindex="0" role="button" class="btn btn-lg btn-neutral w-full h-full p-2 capitalize justify-start">
      {{ userStore.theme }}
    </div>
    <div tabindex="0"
      class="dropdown-content bg-neutral text-neutral-content max-h-60 overflow-auto flex flex-col flex-nowrap w-full rounded-md z-10">
      <template v-for="theme, index in themes" :key="index">
        <button :data-theme="theme" class="btn btn-lg rounded-none capitalize justify-start"
          @click="() => setTheme(theme)">
          <div class="flex justify-between w-full">
            {{ theme }}
            <div class="flex flex-row">
              <div class="w-2 h-full bg-primary rounded-l-lg"></div>
              <div class="w-2 h-full bg-accent"></div>
              <div class="w-2 h-full bg-base-300"></div>
              <div class="w-2 h-full bg-neutral rounded-r-lg"></div>
            </div>
          </div>
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      userStore: useUserStore(),
      themes: [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset", "uysal"
      ]
    }
  },
  methods: {
    setTheme(theme: string) {
      this.userStore.setTheme(theme)
      document.body.setAttribute("data-theme", theme)
    },
  }
}
</script>