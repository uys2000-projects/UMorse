<template>
  <div class="flex flex-col gap-4 shadow-lg p-4 rounded-md">
    <div class="flex flex-col gap-1">
      <div class="flex flex-col gap-4">
        <div class="bg-black rounded-lg">
          <img src="/logo.jpg" alt="logo" class="h-40 m-auto">
        </div>
      </div>
      <DaisyTheme />
      <DaisyAccordion title="Synch" class="rounded-btn bg-neutral text-neutral-content">
        <ul class="menu bg-base-200 rounded-box">
          <li v-if="!userStore.isAuthenticated">
            <label class="label cursor-pointer">
              <span class="label-text">Login With Google</span>
              <span target="_blank" class="text-primary" @click="signIn">
                <span class="material-symbols-rounded">
                  login
                </span>
              </span>
            </label>
          </li>
          <template v-else>
            <li>
              <div class="tooltip" data-tip="This feature will be added soon.">
                <SettingsToggle title="Automatic Synch" :value="false" :disabled="true" />
              </div>
            </li>
            <li>
              <label class="label cursor-pointer">
                <span class="label-text">Manual Synch</span>
                <span target="_blank" class="text-primary" @click="manualSync">
                  <span class="material-symbols-rounded">
                    sync
                  </span>
                </span>
              </label>
            </li>
            <li>
              <label class="label cursor-pointer">
                <span class="label-text">Logout</span>
                <span target="_blank" class="text-primary" @click="signOut">
                  <span class="material-symbols-rounded">
                    logout
                  </span>
                </span>
              </label>
            </li>
          </template>
        </ul>
      </DaisyAccordion>
      <DaisyAccordion title="Application" class="rounded-btn bg-neutral text-neutral-content">
        <ul class="menu bg-base-200 rounded-box">
          <li>
            <SettingsToggle title="Remember Last Translate" :value="userStore.rememberLastTranslate"
              @update:value="userStore.setRememberLastTranslate" />
          </li>
          <li>
            <SettingsToggle title="Remember Last Customization" :value="userStore.rememberCustomizations"
              @update:value="userStore.setRememberCustomizations" />
          </li>
        </ul>
      </DaisyAccordion>
      <DaisyAccordion title="About" class="rounded-btn bg-neutral text-neutral-content">
        <ul class="menu bg-base-200 rounded-box">
          <li>
            <SettingsLink title="Developer Web Page" link="https://mehmetuysal.dev" />
          </li>
          <li>
            <SettingsLink title="UMorse Web Page" link="https://umorse.mehmetuysal.dev" />
          </li>
          <li>
            <SettingsLink title="Short Link Creator" link="https://url.mehmetuysal.dev" />
          </li>
          <li>
            <SettingsLink title="Privacy Policy" link="https://mehmetuysal.dev/privacy/umorse" />
          </li>
        </ul>
        <ul class="menu bg-base-200 rounded-box mt-2">
          <li>
            <SettingsInfo title="Contact" link="mailto:hi@mehmetuysal.dev" value="hi@mehmetuysal.dev" />
          </li>
          <li>
            <SettingsInfo title="Developer" value="Mehmet Uysal" />
          </li>
          <li>
            <SettingsInfo title="Version" value="2.0.0" />
          </li>
        </ul>
      </DaisyAccordion>
    </div>
    <div id="g_id_onload" data-client_id="987245959056-hg7p26eft39h61kt37s644ce857u2f7d" data-context="signin"
      data-login_uri="call" data-itp_support="true">
    </div>
  </div>
</template>

<script lang="ts">
import SettingsLink from '@/components/settings/SettingsLink.vue';
import SettingsToggle from '@/components/settings/SettingsToggle.vue';
import SettingsInfo from '@/components/settings/SettingsInfo.vue';
import DaisyAccordion from '@/components/daisy/DaisyAccordion.vue';
import DaisyTheme from '@/components/daisy/DaisyTheme.vue';
import { useUserStore } from '@/stores/user';
import { signIn, signOut } from '@/services/auth';
import { manualSync, updateSettings } from '@/functions/sync';
export default {
  components: {
    SettingsLink,
    SettingsToggle,
    SettingsInfo,
    DaisyAccordion,
    DaisyTheme
  },
  data() {
    return {
      userStore: useUserStore(),
      autoSync: false,
      rememberLastTranslate: false,
      rememberCusromizations: false,
    }
  },
  methods: {
    signIn: () => signIn(),
    signOut: () => signOut(),
    async manualSync() {
      await manualSync(this.userStore.lastSync)
      this.userStore.setLastSync()
      await updateSettings(this.userStore.id, this.userStore.settings)
    }
  }
}
</script>
<style scoped></style>