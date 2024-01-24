<script lang="ts">
  import { language, t } from "../functions/language";
  import { convertFromMorse, convertToMorse } from "../functions/morse";
  import { isApp } from "../services/capacitor";
  import { readClipboard, writeClipboard } from "../services/clipboard";
  import { share } from "../services/share";
  let dot = ".";
  let dash = "-";
  let separatrix = "/";
  let input = "";
  let output = "";

  let onChangeTimeout: string | number | NodeJS.Timeout;

  const onInputChange = function () {
    clearTimeout(onChangeTimeout);
    onChangeTimeout = setTimeout(
      () => (output = convertToMorse(input, dot, dash, separatrix, $language)),
      500
    );
  };
  const onOutputChange = function () {
    clearTimeout(onChangeTimeout);
    onChangeTimeout = setTimeout(
      () => (input = convertFromMorse(output, dot, dash, separatrix)),
      500
    );
  };
  const copy = function (isInput: boolean) {
    writeClipboard(isInput ? input : output);
  };
  const paste = function (isInput: boolean) {
    readClipboard().then((result) => {
      if (result.type == "text/plain") {
        if (isInput) {
          input = result.value as string;
          output = convertToMorse(input, dot, dash, separatrix, $language);
        } else {
          output = result.value as string;
          input = convertFromMorse(output, dot, dash, separatrix);
        }
      }
    });
  };
  const share_ = function (isInput: boolean) {
    share(isInput ? input : output);
  };
</script>

<div class="morse flex flex-col gap-2 p-2 h-full">
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
    <input
      bind:value={separatrix}
      type="text"
      placeholder={$t("separatrix")}
      class="input input-bordered input-accent w-full"
    />
  </div>
  <textarea
    bind:value={input}
    on:keyup={onInputChange}
    class="textarea textarea-primary h-full"
    placeholder={$t("text")}
  ></textarea>

  <div
    class="flex flex-row flex-nowrap w-full overflow-hidden h-22 flex-shrink-0"
  >
    <button
      on:click={() => copy(true)}
      class="btn flex-grow mx-1 p-1 flex-shrink-1"
    >
      Copy
    </button>
    <button
      on:click={() => paste(true)}
      class="btn flex-grow mx-1 p-1 flex-shrink-1"
    >
      Paste
    </button>
    {#if isApp()}
      <button
        on:click={() => share_(true)}
        class="btn flex-grow mx-1 p-1 flex-shrink-1"
      >
        Share
      </button>
    {/if}
  </div>
  <textarea
    bind:value={output}
    on:keyup={onOutputChange}
    class="textarea textarea-secondary h-full"
    placeholder={$t("result")}
  ></textarea>
  <div
    class="flex flex-row flex-nowrap w-full overflow-hidden h-22 flex-shrink-0"
  >
    <button
      on:click={() => copy(false)}
      class="btn flex-grow mx-1 p-1 flex-shrink-1"
    >
      Copy
    </button>
    <button
      on:click={() => paste(false)}
      class="btn flex-grow mx-1 p-1 flex-shrink-1"
    >
      Paste
    </button>
    {#if isApp()}
      <button
        on:click={() => share_(false)}
        class="btn flex-grow mx-1 p-1 flex-shrink-1"
      >
        Share
      </button>
    {/if}
  </div>
</div>
