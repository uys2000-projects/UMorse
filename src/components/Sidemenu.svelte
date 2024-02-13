<script lang="ts">
  import type { Theme } from "../types/Ui";
  import { loadTheme, setTheme } from "../functions/theme";
  import { themes } from "../Themes/themes";
  import { loadLanguage, setLanguage, t } from "../functions/language";
  import { getPrefence, setPrefence } from "../services/prefences";
  import { textMemory, customizationMemory } from "../storage/prefences";
  let theme: Theme;
  let language: "tr" | "en";

  getPrefence<boolean>("textMemory").then((val) => {
    if (val) {
      textMemory.set(val);
    }
  });
  getPrefence<boolean>("customMemory").then((val) => {
    if (val) {
      customizationMemory.set(val);
    }
  });

  loadLanguage().then((lang) => {
    if (lang) language = lang;
  });
  const updateLanguage = () =>
    setTimeout(() => {
      setLanguage(language);
    }, 100);

  const updateTheme = () => setTimeout(() => setTheme(theme), 100);

  const changeCustomPrefence = () => {
    customizationMemory.set(!$customizationMemory);
    setPrefence("customMemory", $customizationMemory);
  };
  const changeTextPrefence = () => {
    textMemory.set(!$textMemory);
    setPrefence("textMemory", $textMemory);
  };

  loadTheme().then((t) => (t ? (theme = t) : 0));
</script>

<div class="drawer drawer-end h-full flex flex-col">
  <input id="drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content h-full flex flex-col overflow-hidden">
    <slot />
  </div>
  <div class="drawer-side overflow-hidden">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay">
    </label>
    <ul
      class="flex flex-col p-4 w-80 max-w-[75vw] min-h-full bg-base-200 text-base-content gap-2"
    >
      <li>
        <div
          class="hero"
          style="background-image: url(https://mehmetuysal.dev/logo.jpg);"
        >
          <div class="hero-overlay bg-opacity-60"></div>
          <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">UMorse</div>
          </div>
        </div>
      </li>
      <li>
        {$t("language")}
        <select
          on:change={updateLanguage}
          bind:value={language}
          tabindex="-1"
          class="select w-full max-w-xs"
        >
          <option disabled>{$t("chooselanguage")}</option>
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>
      </li>
      <li>
        {$t("theme")}
        <select
          on:change={updateTheme}
          bind:value={theme}
          tabindex="-1"
          class="select w-full max-w-xs"
        >
          <option disabled>{$t("choosetheme")}</option>
          {#each themes as t}
            <option value={t.value}>{t.label}</option>
          {/each}
        </select>
      </li>
      <li>
        {$t("memory")}
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{$t("customization")}</span>
            <input
              type="checkbox"
              checked={$customizationMemory}
              on:click={changeCustomPrefence}
              class="checkbox"
            />
          </label>
          <label class="label cursor-pointer -mt-3">
            <span class="label-text">{$t("text")}</span>
            <input
              type="checkbox"
              checked={$textMemory}
              on:click={changeTextPrefence}
              class="checkbox"
            />
          </label>
        </div>
      </li>
      <li class="mt-auto">
        <a
          class="btn btn-ghost text-center w-full underline text-lg"
          href="https://mehmetuysal.dev"
          target="_blank"
        >
          {$t("developer")}
        </a>
      </li>
      <li class="text-center">
        <a class="underline" href="/#privacy-modal">
          Privacy Policy (Only English)</a
        >
      </li>
    </ul>
  </div>
</div>
