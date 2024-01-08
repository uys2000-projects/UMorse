import { getPrefence, setPrefence } from "../services/prefences";
import { derived, writable } from "svelte/store";
import tranlations from "../data/translations";
export const language = writable("en" as "en" | "tr");
export const setLanguage = function (lang: "tr" | "en") {
  language.set(lang);
  return setPrefence("lang", lang);
};

export const loadLanguage = function () {
  return getPrefence<"en" | "tr">("lang").then((lang) => {
    if (lang) language.set(lang);
    return lang;
  });
};

export const t = derived(language, ($language) => (key: string) => {
  return tranlations[$language][key];
});
