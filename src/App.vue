<template>
  <router-view />
</template>
<script lang="ts">
import "@/assets/main.css";
import { RouterView } from 'vue-router';
import { authListener } from './services/auth';
import { useUserStore } from './stores/user';
import { getDoc } from './services/db';
import { USERSETTINGS } from './classes/constants';
import type { UserSettings } from './classes/user';
export default {
  components: { RouterView },
  data() {
    return {
      userStore: useUserStore()
    }
  },
  methods: {
    setTheme(theme: string) {
      document.body.setAttribute("data-theme", theme)
    },
  },
  async mounted() {
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
