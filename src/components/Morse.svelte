<script lang="ts">
  import { onMount } from "svelte";
  import { language, t } from "../functions/language";
  import { convertFromMorse, convertToMorse } from "../functions/morse";
  import { isApp } from "../services/capacitor";
  import { readClipboard, writeClipboard } from "../services/clipboard";
  import { share } from "../services/share";
  import { textMemory } from "../storage/prefences";
  import { getPrefence, setPrefence } from "../services/prefences";
  let dot = ".";
  let dash = "-";
  let separatrix = "/";
  let input = "";
  let output = "";

  let isConvertedToMorse = false;

  let onChangeTimeout: string | number | NodeJS.Timeout;

  const saveTexts = () => {
    if ($textMemory) {
      setPrefence("input", input);
      setPrefence("output", output);
    } else {
      setPrefence("input", "");
      setPrefence("output", "");
    }
  };
  const onInputChange = function () {
    isConvertedToMorse = true;
    clearTimeout(onChangeTimeout);
    onChangeTimeout = setTimeout(() => {
      output = convertToMorse(input, dot, dash, separatrix, $language);
      saveTexts();
    }, 500);
  };
  const onOutputChange = function () {
    isConvertedToMorse = false;
    clearTimeout(onChangeTimeout);
    onChangeTimeout = setTimeout(() => {
      input = convertFromMorse(output, dot, dash, separatrix);
      saveTexts();
    }, 500);
  };
  const del = function (isInput: boolean) {
    isInput ? (input = "") : (output = "");
    saveTexts();
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
          saveTexts();
        } else {
          output = result.value as string;
          input = convertFromMorse(output, dot, dash, separatrix);
          saveTexts();
        }
      }
    });
  };
  const share_ = function (isInput: boolean) {
    share(isInput ? input : output);
  };
  const loadTexts = function () {
    getPrefence<boolean>("textMemory").then((textMemory) => {
      if (textMemory) {
        getPrefence<string>("input").then((val) => {
          if (val) input = val;
        });
        getPrefence<string>("output").then((val) => {
          if (val) output = val;
        });
      } else saveTexts();
    });
  };
  const onCustomizationChanged = function () {
    setPrefence("lastCustomizations", [dot, dash, separatrix]);
    isConvertedToMorse ? onInputChange() : onOutputChange();
  };
  const loadCustomization = function () {
    getPrefence<boolean>("customMemory").then((customMemory) => {
      if (customMemory) {
        getPrefence<string[3]>("lastCustomizations").then((val) => {
          if (val && val.length == 3) {
            dot = val[0];
            dash = val[1];
            separatrix = val[2];
          }
        });
      } else setPrefence("lastCustomizations", [dot, dash, separatrix]);
    });
  };
  onMount(() => {
    loadCustomization();
    loadTexts();
  });
</script>

<div class="morse flex flex-col gap-2 p-2 h-full">
  <div class="flex gap-2">
    <input
      bind:value={dot}
      on:change={onCustomizationChanged}
      type="text"
      placeholder={$t("dot")}
      class="input input-bordered input-accent w-full"
    />
    <input
      bind:value={dash}
      on:change={onCustomizationChanged}
      type="text"
      placeholder={$t("dash")}
      class="input input-bordered input-accent w-full"
    />
    <input
      bind:value={separatrix}
      on:change={onCustomizationChanged}
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
      on:click={() => del(true)}
      class="btn flex-grow mx-1 p-1 flex-shrink-1"
    >
      Delete
    </button>
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
      on:click={() => del(false)}
      class="btn flex-grow mx-1 p-1 flex-shrink-1"
    >
      Delete
    </button>
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
