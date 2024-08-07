<template>
  <div ref="morse-content" class="flex flex-col flex-grow gap-4 p-4 bg-neutral rounded-btn shadow-lg">
    <div class="flex flex-nowrap gap-4">
      <input type="text" :placeholder="context.Dot" v-model="userStore.morse.dot" @change="rememberSyncher"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" />
      <input type="text" :placeholder="context.Dash" v-model="userStore.morse.dash" @change="rememberSyncher"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" />
      <input type="text" :placeholder="context.Slash" v-model="userStore.morse.slash" @change="rememberSyncher"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" />
    </div>
    <div class="containers flex-grow">
      <TextBox v-model:to-morse="userStore.toMorse" @update:to-morse="toMorseChanged"
        v-model:value="userStore.morse.text" @update:value="textChanged" @save="save" />
      <TextBox :to-morse="!userStore.toMorse" disabled v-model:value="userStore.result" @save="save" />
    </div>
  </div>
</template>

<script lang="ts">
import { Morse } from "@/classes/morse";
import TextBox from "@/components/shared/TextBox.vue";
import { convertFromMorse, convertToMorse } from "@/functions/converter";
import { setMorseFile } from "@/functions/morse";
import { getPreferences, setPreferences } from "@/services/preferences";
import { useContextStore } from "@/stores/context";
import { useUserStore } from "@/stores/user";
export default {
  components: { TextBox },
  data() {
    return {
      updater: 0,
      userStore: useUserStore(),
      contextStore: useContextStore(),
    };
  },
  methods: {
    getMorse() {
      const morse = { ...this.userStore.morse }
      morse.timestamp = Date.now();
      morse.utimestamp = Date.now();
      if (this.userStore.isAuthenticated)
        morse.uid = this.userStore.id
      if (!this.userStore.toMorse) morse.text = convertFromMorse(
        morse.text,
        morse.dot,
        morse.dash,
        morse.slash,
      )
      console.log(morse)
      return morse;
    },
    convert() {
      const convert = this.userStore.toMorse ? convertToMorse : convertFromMorse;
      this.userStore.result = convert(
        this.userStore.morse.text,
        this.userStore.morse.dot,
        this.userStore.morse.dash,
        this.userStore.morse.slash,
        "en"
      )
      this.rememberSyncher()
    },
    save() {
      setMorseFile(this.getMorse())
    },
    rememberSyncher() {
      const morse = { ...this.userStore.morse }
      if (!this.userStore.rememberCustomizations) {
        morse.dot = "."
        morse.dash = "-"
        morse.slash = "/"
      }
      if (!this.userStore.rememberLastTranslate) {
        morse.text = ""
      }
      setPreferences("lastMorse", morse)
    },
    textChanged(value: string) {
      this.userStore.morse.text = value;
      clearTimeout(this.updater);
      this.updater = setTimeout(this.convert, 500);
    },
    toMorseChanged() {
      setPreferences("toMorse", this.userStore.toMorse.toString())
    }
  },
  computed: {
    context() {
      return this.contextStore.context.HomePage ?? {}
    }
  },
  async mounted() {
    if (this.userStore.firstOpen) {
      this.userStore.firstOpen = false;
      this.userStore.toMorse = await getPreferences<boolean>("toMorse") != false
      const lastMorse = await getPreferences<Morse>("lastMorse")
      if (lastMorse) { this.userStore.morse = lastMorse; this.convert(); }
    }
  }
};

</script>

<style scoped>
.containers {
  @apply flex flex-col gap-4 lg:flex-row;
}
</style>
