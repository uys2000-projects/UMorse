<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script lang="ts">
import "@/assets/main.css";
import { RouterView } from 'vue-router';
import { authListener } from './services/auth';
import { useUserStore } from './stores/user';
import { getDoc } from './services/db';
import { USERSETTINGS } from './classes/constants';
import type { UserSettings } from './classes/user';
import { useContextStore } from "./stores/context";
import { getDeviceLanguage } from "./services/device";
import { KeepAlive } from "vue";
export default {
  components: { RouterView, KeepAlive },
  data() {
    return {
      userStore: useUserStore(),
      contextStore: useContextStore()
    }
  },
  methods: {
    setTheme(theme: string) {
      document.body.setAttribute("data-theme", theme)
    },
  },
  async mounted() {
    getDeviceLanguage().then((language) => {
      this.contextStore.loadLanguage(language)
    })

    await this.userStore.loadSettings()
    this.setTheme(this.userStore.theme)

    authListener(async user => {
      if (!user) return this.userStore.removeUser()
      this.userStore.setUser(user);

      const snapshot = await getDoc(USERSETTINGS, user.uid)
      if (!snapshot.exists()) return;

      const data = snapshot.data() as UserSettings
      this.userStore.setSettings(data)
    })
  }
}
</script>
