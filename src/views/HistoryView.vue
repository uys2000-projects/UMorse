<template>
  <div class="about flex flex-col lg:flex-row lg:flex-wrap lg:justify-between gap-4 p-4 bg-neutral rounded-btn">
    <template v-for="morse, index in morses" :key="index">
      <HistoryBox :morse="morse" @update:morse="(morse) => morses[index] = morse"
        @delete:morse="(morse) => deleteMorse(morse, index)" @reload:morse="(morse) => reloadMorse(morse, index)"
        @save:morse="(morse) => saveMorse(morse, index)" />
    </template>
    <div class="bg-base-100 w-full p-4 rounded-btn" v-if="morses.length == 0">
      {{ context.NotFound }}
    </div>
  </div>
</template>

<script lang="ts">
import type { Morse } from "@/classes/morse";
import HistoryBox from "../components/shared/HistoryBox.vue"
import { deleteMorseFile, readMorseFile, readMorseFiles, setMorseFile } from "@/functions/morse";
import { useContextStore } from "@/stores/context";
export default {
  components: { HistoryBox },
  data() {
    return {
      morses: [] as Morse[],
      contextStore: useContextStore()
    }
  },
  computed: {
    context() {
      return this.contextStore.context.HistoryPage ?? {}
    }
  },
  methods: {
    deleteMorse(morse: Morse, index: number) {
      deleteMorseFile(morse.timestamp.toString())
      this.morses.splice(index, 1)
    },
    reloadMorse(morse: Morse, index: number) {
      readMorseFile(morse.timestamp.toString()).then(morse => {
        if (morse) this.morses[index] = morse;
      })
    },
    saveMorse(morse: Morse, index: number) {
      setMorseFile(morse).then(() => {
        morse.utimestamp = Date.now();
        this.morses[index] = morse;
      })
    },
  },
  mounted() {
    readMorseFiles(async (morse) => {
      this.morses.push(morse)
    })
  }
}
</script>