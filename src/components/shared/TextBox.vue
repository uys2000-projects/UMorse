<template>
  <div class="text-box">
    <textarea :placeholder="disabled ? context.PlaceHolderResult : context.PlaceHolderConvert" :disabled="disabled"
      class="textarea textarea-primary textarea-bordered textarea-lg w-full max-w-full"
      style="height: 25vh; height: 25dvh;" v-model="_value"></textarea>
    <select v-model="_toMorse" :disabled="disabled" class="select select-primary select-bordered">
      <option :value="false" selected>{{ disabled ? context.SelectorResult : context.SelectorFromMorse }}</option>
      <option :value="true">{{ disabled ? context.SelectorResult : context.SelectorToMorse }}</option>
    </select>
    <div class="buttons">
      <button v-if="!disabled" class="material-symbols-rounded" @click="deleteText">
        mop
      </button>
      <button class="material-symbols-rounded" @click="copyText">
        content_copy
      </button>
      <button v-if="!disabled" class="material-symbols-rounded" @click="cutText">
        content_cut
      </button>
      <button v-if="!disabled" class="material-symbols-rounded" @click="pasteText">
        content_paste
      </button>
      <button class="material-symbols-rounded" @click="shareText">
        share
      </button>
      <button class="material-symbols-rounded" @click="save">
        local_library
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { readClipboard, writeClipboard } from '@/services/clipboard';
import { share } from '@/services/share';
import { useContextStore } from '@/stores/context';

export default {
  emits: ["update:toMorse", "update:value", "save"],
  data() {
    return {
      contextStore: useContextStore()
    }
  },
  props: {
    toMorse: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    _toMorse: {
      get() {
        return this.toMorse
      },
      set(value: boolean) {
        this.$emit("update:toMorse", value)
      }
    },
    _value: {
      get() {
        return this.value
      },
      set(value: boolean) {
        this.$emit("update:value", value)
      }
    },
    context() {
      return this.contextStore.context.TextBox ?? {};
    }
  },
  methods: {
    deleteText() {
      this._value = "";
    },
    copyText() {
      writeClipboard(this._value)
    },
    cutText() {
      writeClipboard(this._value)
      this._value = "";
    },
    async pasteText() {
      const value = await readClipboard();
      if (value) this._value = value;
    },
    shareText() {
      share("Share", "Share", this._value, "https://umorse.mehmetuysal.dev")
    },
    save() {
      this.$emit('save')
    }
  }
}
</script>

<style scoped>
.text-box {
  @apply w-full relative pt-5 min-h-[50%]
}

.textarea {
  @apply min-h-full disabled:cursor-default disabled:textarea-primary disabled:opacity-100 disabled:bg-base-100 disabled:text-base-content
}

.select {
  @apply min-w-40 w-1/3 absolute top-0 left-1 select-sm disabled:select-primary disabled:opacity-100 disabled:bg-base-100 disabled:text-base-content disabled:cursor-default
}

.buttons {
  @apply absolute bottom-3 right-4 flex gap-3
}

button {
  @apply opacity-85 cursor-pointer
}
</style>