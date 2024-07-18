<template>
  <div class="flex flex-col gap-2 w-full lg:w-[calc(50%-.5rem)]">
    <div ref="carousel" class="carousel">
      <div class="carousel-item">
        <div class="relative pb-2">
          <div class="info">
            <div class="item" v-html="new Date(morse.timestamp).toLocaleDateString()" />
            <div class="arrow material-symbols-outlined" @click="toNext">
              arrow_forward_ios
            </div>
          </div>
          <div class="content">
            <div v-html="_Morse.morse" />
          </div>
          <div class="buttons">
            <button class="material-symbols-rounded" @click="() => $emit('delete:morse', morse)">
              delete
            </button>
            <button class="material-symbols-rounded" @click="copyMorse">
              content_copy
            </button>
            <button v-if="!onWeb" class="material-symbols-rounded" @click="shareText">
              share
            </button>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="relative pb-2">
          <div class="info">
            <div class="item" v-html="morse.dot" />
            <div class="item" v-html="morse.dash" />
            <div class="item" v-html="morse.slash" />
            <div class="arrow back material-symbols-outlined" @click="toPrevious">
              arrow_forward_ios
            </div>
          </div>
          <div class="content">
            <textarea class="w-full bg-transparent focus:outline-none" v-model="morse.text"></textarea>
          </div>
          <div class="buttons">
            <button class="material-symbols-rounded" @click="morse.text = ''">
              mop
            </button>
            <button class="material-symbols-rounded" @click="copyText">
              content_copy
            </button>
            <button v-if="!onWeb" class="material-symbols-rounded" @click="shareText">
              share
            </button>
            <button class="material-symbols-rounded" @click="() => $emit('reload:morse', morse)">
              refresh
            </button>
            <button class="material-symbols-rounded" @click="() => $emit('save:morse', morse)">
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Morse } from '@/classes/morse';
import { convertToMorse } from '@/functions/converter';
import { writeClipboard } from '@/services/clipboard';
import { getDevicePlatformInfo } from '@/services/device';
import { share } from '@/services/share';
import type { PropType } from 'vue';

export default {
  emits: ["update:morse", "delete:morse", "reload:morse", "save:morse",],
  props: {
    morse: {
      type: Object as PropType<Morse>,
      required: true,
    }
  },
  computed: {
    _Morse: {
      get() {
        return { ...this.morse, morse: convertToMorse(this.morse.text, this.morse.dot, this.morse.dash, this.morse.slash) };
      },
      set(value: Morse) {
        this.$emit("update:morse", value);
      }
    }
  },
  data() {
    return {
      isFirstPage: true,
      onWeb: false,
    }
  },
  methods: {
    copyMorse() {
      writeClipboard(this._Morse.morse)
    },
    copyText() {
      writeClipboard(this.morse.text)
    },
    shareMorse() {
      share("Share", "Share", this._Morse.morse, "umorse.mehmetuysal.dev")
    },
    shareText() {
      share("Share", "Share", this.morse.text, "umorse.mehmetuysal.dev")
    },
    toNext() {
      this.isFirstPage = false;
      const carousel = this.$refs.carousel as HTMLDivElement;
      carousel.scrollLeft += carousel.clientWidth;
    },
    toPrevious() {
      this.isFirstPage = true;
      const carousel = this.$refs.carousel as HTMLDivElement;
      carousel.scrollLeft = 0;
    }
  },
  mounted() {
    getDevicePlatformInfo().then(result => this.onWeb = result == "web")
  }
}
</script>

<style scoped>
.carousel {
  @apply w-full relative
}

.carousel-item {
  @apply w-full
}

.carousel-item>div {
  @apply w-full rounded-btn input input-primary p-2 h-max min-h-full
}

.carousel-item>div:has(textarea:focus) {
  @apply input-secondary outline-0
}


.info {
  @apply relative flex gap-2 border-b border-b-primary bg-base-200 rounded-t-box px-8
}

.carousel-item:has(textarea:focus) .info {
  @apply border-b-secondary
}

.info .item {
  @apply w-full text-center p-1
}

.info .arrow {
  @apply absolute cursor-pointer right-px top-1 bg-base-100 rounded-full p-px pl-[3px] pr-0;
  font-size: 20px;
}

.info .arrow.back {
  transform: rotateY(180deg);
}

.content {
  @apply relative h-max p-2
}

.buttons {
  @apply absolute bottom-2 right-4 flex gap-3
}

button {
  @apply opacity-85 cursor-pointer
}
</style>
