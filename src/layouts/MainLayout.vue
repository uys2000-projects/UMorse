<template>
  <Transition name="slide-up">
    <template v-if="showLoader">
      <DaisyLoader />
    </template>
    <template v-else>
      <div id="layout" class="flex flex-col min-h-screen">
        <div ref="app-name"
          class="fixed top-0 py-1 px-8 text-lg lg:hidden left-1/2 -translate-x-1/2 bg-neutral text-neutral-content rounded-b-lg z-10">
          UMorse
        </div>
        <div ref="app-container" class="flex flex-col flex-grow p-6 pt-14 pb-24 lg:py-8 order-2">
          <RouterView />
          <div id="add-place" class="flex justify-center w-full pb-4"></div>
        </div>
        <TheHeader />
      </div>
    </template>
  </Transition>
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from "@/components/layout/TheHeader.vue"
import { initializeAdMob, showAdMobBanner, showAdMobInterstitial } from '@/services/adMob';
import DaisyLoader from '@/components/daisy/DaisyLoader.vue';
import { getDevicePlatformInfo } from '@/services/device';
import { bottomMobilOptions, bottomMobilSrc, bottomOptions, bottomSrc } from '@/data/adsense';
import { useUserStore } from '@/stores/user';
export default {
  components: { DaisyLoader, RouterView, TheHeader },
  data() {
    return {
      showLoader: true,
      userStore: useUserStore(),
    }
  },
  methods: {
    loadWebAds() {
      this.showLoader = false;
      setTimeout(() => {
        let option = bottomMobilOptions;
        let src = bottomMobilSrc
        if (window.innerWidth > 400) {
          option = bottomOptions
          src = bottomSrc
        }
        window.atOptions = option
        const script = document.createElement("script");
        script.setAttribute('type', "text/javascript");
        script.setAttribute('src', src);
        const layout = document.querySelector("#add-place") as HTMLDivElement
        layout.appendChild(script);
      }, 200);
    },
    async loadAppAds() {
      if (this.userStore.showStartAdd) {
        await initializeAdMob()
        showAdMobInterstitial(() => {
          showAdMobBanner(this.updateLayoutApp)
          setTimeout(() => this.showLoader = false, 1000);
        }).catch(() => this.showLoader = false)
      } else {
        this.showLoader = false
        await initializeAdMob()
        showAdMobBanner(this.updateLayoutApp)
      }
    },
    updateLayoutApp() {
      const appName = this.$refs["app-name"] as HTMLDivElement
      appName.classList.remove("top-0")
      appName.classList.add("top-12")
      const appContainer = this.$refs["app-container"] as HTMLDivElement
      appContainer.classList.remove("pt-14")
      appContainer.classList.add("pt-24")
    },
  },
  async mounted() {
    const platform = await getDevicePlatformInfo()
    if (platform == "web") this.loadWebAds()
    else this.loadAppAds()
  }
}

declare global {
  interface Window {
    atOptions: object;
  }
}

</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>