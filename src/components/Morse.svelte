<script lang="ts">
  import { t } from "../functions/language";
  import { convertFromMorse, convertToMorse } from "../functions/morse";
  let dot = ".";
  let dash = "-";
  let input = "";
  let output = "";

  let onChangeTimeout: string | number | NodeJS.Timeout;

  const onInputChange = function () {
    clearTimeout(onChangeTimeout);
    onChangeTimeout = setTimeout(
      () => (output = convertToMorse(input, dot, dash, "tr")),
      500
    );
  };
  const onOutputChange = function () {
    clearTimeout(onChangeTimeout);
    onChangeTimeout = setTimeout(
      () => (input = convertFromMorse(output, dot, dash)),
      500
    );
  };
</script>

<div class="flex flex-col gap-2 p-2 h-full">
  <div class="flex gap-2">
    <input
      bind:value={dot}
      type="text"
      placeholder={$t("dot")}
      class="input input-bordered input-accent w-full"
    />
    <input
      bind:value={dash}
      type="text"
      placeholder={$t("dash")}
      class="input input-bordered input-accent w-full"
    />
  </div>
  <textarea
    bind:value={input}
    on:keyup={onInputChange}
    class="textarea textarea-primary h-full"
    placeholder={$t("text")}
  ></textarea>
  <textarea
    bind:value={output}
    on:keyup={onOutputChange}
    class="textarea textarea-secondary h-full"
    placeholder={$t("result")}
  ></textarea>
</div>
