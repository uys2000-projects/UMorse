import { getPrefence, setPrefence } from "../services/prefences";
import { derived, writable } from "svelte/store";
import tranlations from "../data/translations";
import { getLangCode } from "../services/device";
export const language = writable("en" as "en" | "tr");
export const setLanguage = function (lang: "tr" | "en") {
  language.set(lang);
  return setPrefence("lang", lang);
};

export const loadLanguage = function () {
  return getPrefence<"en" | "tr">("lang").then(async (lang) => {
    if (lang) language.set(lang);
    else {
      const { value } = await getLangCode.pLogger();
      if (value == "tr") language.set("tr");
      else language.set("en");
    }
    return lang;
  });
};

export const t = derived(language, ($language) => (key: string) => {
  return tranlations[$language][key];
});
