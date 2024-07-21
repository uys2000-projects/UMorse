<template>
  <div class="flex flex-col gap-4 shadow-lg p-4 rounded-md">
    <div class="flex flex-col gap-1">
      <div class="flex flex-col gap-4">
        <div class="bg-black rounded-lg">
          <img src="/logo.jpg" alt="logo" class="h-40 m-auto">
        </div>
      </div>
      <DaisyTheme />
      <DaisyAccordion :title="context.Sync" class="rounded-btn bg-neutral text-neutral-content">
        <ul class="menu bg-base-200 rounded-box">
          <li v-if="!userStore.isAuthenticated">
            <label class="label cursor-pointer">
              <span class="label-text">{{ context.Login }}</span>
              <span target="_blank" class="text-primary" @click="signIn">
                <span class="material-symbols-rounded">
                  login
                </span>
              </span>
            </label>
          </li>
          <template v-else>
            <li>
              <div class="tooltip" :data-tip="context.FeatureWillBeAdded">
                <SettingsToggle :title="context.AutoSync" :value="false" :disabled="true" />
              </div>
            </li>
            <li>
              <label class="label cursor-pointer">
                <span class="label-text">{{ context.ManualSync }}</span>
                <span target="_blank" class="text-primary" @click="checkSyncMethod">
                  <span class="material-symbols-rounded">
                    sync
                  </span>
                </span>
              </label>
            </li>
            <li>
              <label class="label cursor-pointer">
                <span class="label-text">{{ context.Logout }}</span>
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
      <DaisyAccordion :title="context.Application" class="rounded-btn bg-neutral text-neutral-content">
        <ul class="menu bg-base-200 rounded-box">
          <li>
            <label class="label cursor-pointer">
              <span class="label-text">{{ context.Language }}</span>
              <label class="swap swap-active btn btn-sm btn-neutral" @click="changeLanguage">
                <input type="checkbox" />
                <div :class="contextStore.language == 'tr' ? 'swap-on' : 'swap-off'">TR</div>
                <div :class="contextStore.language == 'en' ? 'swap-on' : 'swap-off'">EN</div>
              </label>
            </label>
          </li>
          <li>
            <SettingsToggle :title="context.RememberLastTranslate" :value="userStore.rememberLastTranslate"
              @update:value="userStore.setRememberLastTranslate" />
          </li>
          <li>
            <SettingsToggle :title="context.RememberCustomizations" :value="userStore.rememberCustomizations"
              @update:value="userStore.setRememberCustomizations" />
          </li>
        </ul>
      </DaisyAccordion>
      <DaisyAccordion :title="context.Info" class="rounded-btn bg-neutral text-neutral-content">
        <ul class="menu bg-base-200 rounded-box">
          <li>
            <SettingsLink :title="context.DeveloperWebPage" link="https://mehmetuysal.dev" />
          </li>
          <li>
            <SettingsLink :title="context.UmorseWebPage" link="https://umorse.mehmetuysal.dev" />
          </li>
          <li>
            <SettingsLink :title="context.ShortLinkWebPage" link="https://url.mehmetuysal.dev" />
          </li>
          <li>
            <SettingsLink :title="context.PrivacyPolicy" link="https://mehmetuysal.dev/privacy/umorse" />
          </li>
        </ul>
        <ul class="menu bg-base-200 rounded-box mt-2">
          <li>
            <SettingsInfo :title="context.Contact" link="mailto:hi@mehmetuysal.dev" value="hi@mehmetuysal.dev" />
          </li>
          <li>
            <SettingsInfo :title="context.Developer" value="Mehmet Uysal" />
          </li>
          <li>
            <SettingsInfo :title="context.Version" value="2.0.0" />
          </li>
        </ul>
      </DaisyAccordion>
    </div>
    <DaisyModal ref="modal">
      <template v-if="showRemoteSyncModal">
        <div role="alert" class="alert align-super text-neutral-content p-8">
          <div class="alert">
            <span class="material-symbols-rounded text-[40px]">warning</span>
            <span>
              <b>Warning:</b> All local records will be deleted and remote records will saved instead.
            </span>
          </div>
          <button class="btn btn-neutral w-full sm:min-w-36" @click="loadRemoteRecords">Load Remote Records</button>
        </div>
      </template>
      <template v-else>
        <div role="alert" class="alert alert-warning p-8">
          <span class="material-symbols-rounded text-[40px]">warning</span>
          <span><b>Warning:</b> All remote records will be deleted and local records will uploaded instead.</span>
          <button class="btn btn-neutral w-full sm:min-w-36" @click="upladLocalRecords">Upload Local Records</button>
        </div>
      </template>
    </DaisyModal>
    <template v-if="showLoader">
      <DaisyLoader />
    </template>
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
import { checkSyncMethod, synchFromLocale, synchFromRemote, updateSettings } from '@/functions/sync';
import DaisyModal from '@/components/daisy/DaisyModal.vue';
import DaisyLoader from '@/components/daisy/DaisyLoader.vue';
import { useContextStore } from '@/stores/context';
export default {
  components: {
    SettingsLink,
    SettingsToggle,
    SettingsInfo,
    DaisyAccordion,
    DaisyTheme,
    DaisyModal,
    DaisyLoader
  },
  data() {
    return {
      userStore: useUserStore(),
      contextStore: useContextStore(),
      showRemoteSyncModal: false,
      showLoader: false
    }
  },
  computed: {
    context() {
      return this.contextStore.context.SettingsPage ?? {}
    }
  },
  methods: {
    signIn: () => signIn(),
    signOut: () => signOut(),
    async runAfterModal(callback: () => Promise<void>) {
      const modal = this.$refs.modal as typeof DaisyModal
      modal.close()
      this.showLoader = true;
      await callback();
      this.showLoader = false;
    },
    async checkSyncMethod() {
      const res = await checkSyncMethod(this.userStore.lastSync)
      this.showRemoteSyncModal = res == "remote"
      const modal = this.$refs.modal as typeof DaisyModal
      modal.show()
    },
    async upladLocalRecords() {
      this.runAfterModal(async () => {
        await synchFromLocale(this.userStore.id);
        this.userStore.setLastSync();
        await updateSettings(this.userStore.id, this.userStore.settings);
      })
    },
    async loadRemoteRecords() {
      this.runAfterModal(async () => {
        await synchFromRemote(this.userStore.id);
        this.userStore.setLastSync();
        await updateSettings(this.userStore.id, this.userStore.settings);
      })
    },
    changeLanguage() {
      if (this.contextStore.language == 'tr') this.contextStore.setLanguage("en")
      else this.contextStore.setLanguage("tr")
    }
  }
}
</script>