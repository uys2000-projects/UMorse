<template>
  <div class="flex flex-col flex-grow gap-4 p-4 bg-neutral rounded-btn shadow-lg">
    <div class="flex flex-nowrap gap-4">
      <input type="text" placeholder="Dot" v-model="morse.dot" @change="rememberSyncher"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" />
      <input type="text" placeholder="Dash" v-model="morse.dash" @change="rememberSyncher"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" />
      <input type="text" placeholder="Slash" v-model="morse.slash" @change="rememberSyncher"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" />
    </div>
    <div class="containers flex-grow">
      <TextBox v-model:to-morse="toMorse" v-model:value="morse.text" @update:value="textChanged" @save="save" />
      <TextBox :to-morse="!toMorse" disabled v-model:value="result" @save="save" />
    </div>
  </div>
</template>

<script lang="ts">
import { Morse } from "@/classes/morse";
import TextBox from "@/components/shared/TextBoxt.vue";
import { convertFromMorse, convertToMorse } from "@/functions/converter";
import { writeFile } from "@/services/filesystem";
import { getPreferences, setPreferences } from "@/services/preferences";
import { useUserStore } from "@/stores/user";
export default {
  components: { TextBox },
  data() {
    return {
      updater: 0,
      toMorse: false,
      morse: new Morse(),
      userStore: useUserStore(),
      result: "",
    };
  },
  methods: {
    getMorse() {
      this.morse.timestamp = Date.now();
      this.morse.utimestamp = Date.now();
      return this.morse;
    },
    convert() {
      const convert = this.toMorse ? convertFromMorse : convertToMorse;
      this.result = convert(
        this.morse.text,
        this.morse.dot,
        this.morse.dash,
        this.morse.slash,
        "en"
      )
      this.rememberSyncher()
    },
    async save() {
      const morse = this.getMorse();
      await writeFile(`morse/${morse.timestamp}.unote`, JSON.stringify(morse))
    },
    rememberSyncher() {
      const morse = { ...this.morse }
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
      this.morse.text = value;
      clearTimeout(this.updater);
      this.updater = setTimeout(this.convert, 500);
    }
  },
  async mounted() {
    const lastMorse = await getPreferences<Morse>("lastMorse")
    if (lastMorse) { this.morse = lastMorse; this.convert(); }
  }
};
</script>

<style scoped>
.containers {
  @apply flex flex-col gap-4 lg:flex-row;
}
</style>
