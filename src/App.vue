<template>
  <router-view />
</template>
<script lang="ts">
import { RouterView } from 'vue-router';
import { authListener } from './services/auth';
import { useUserStore } from './stores/user';
export default {
  components: { RouterView },
  data() {
    return {
      userStore: useUserStore()
    }
  },
  mounted() {
    authListener(user => {
      if (user) this.userStore.setUser(user);
      else this.userStore.removeUser()
    })
  }
}
</script>
