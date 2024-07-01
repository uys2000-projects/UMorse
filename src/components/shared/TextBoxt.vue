<template>
  <div class="text-box">
    <textarea :placeholder="disabled ? 'Result will come here...' : 'Something for translation...'" :disabled="disabled"
      class="textarea textarea-primary textarea-bordered textarea-lg w-full max-w-full"
      style="height: 25vh; height: 25dvh;"></textarea>
    <select v-model="_toMorse" :disabled="disabled" class="select select-primary select-bordered">
      <option :value="true" selected>From Morse</option>
      <option :value="false">To Morse</option>
    </select>
    <div class="buttons">
      <button class="material-symbols-rounded" :disabled="disabled">
        delete
      </button>
      <button class="material-symbols-rounded" :disabled="disabled">
        content_copy
      </button>
      <button class="material-symbols-rounded" :disabled="disabled">
        content_cut
      </button>
      <button class="material-symbols-rounded" :disabled="disabled">
        content_paste
      </button>
      <button class="material-symbols-rounded" :disabled="disabled">
        share
      </button>
      <button class="material-symbols-rounded" :disabled="disabled">
        local_library
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ["update:toMorse"],
  props: {
    toMorse: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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