<template>
  <div class="flex flex-col gap-4 p-4 bg-neutral rounded-md shadow-lg">
    <div class="flex flex-nowrap gap-4">
      <input type="text" placeholder="."
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" v-model="dot" />
      <input type="text" placeholder="-"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" v-model="dash" />
      <input type="text" placeholder="/"
        class="input input-primary input-bordered w-full text-center lg:text-left max-w-28" v-model="slash" />
    </div>
    <div class="containers flex-grow">
      <TextBox v-model:to-morse="toMorse" />
      <TextBox :to-morse="!toMorse" disabled />
    </div>
  </div>
</template>

<script lang="ts">
import TextBox from "@/components/shared/TextBoxt.vue"
export default {
  components: { TextBox },
  data() {
    return {
      dot: ".",
      dash: "-",
      slash: "/",
      toMorse: false,
    }
  },
}
</script>
<style scoped>
.containers {
  @apply flex flex-col gap-4 lg:flex-row
}
</style>