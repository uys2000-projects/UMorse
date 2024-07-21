import { getPreferences, setPreferences } from "@/services/preferences";
import { defineStore } from "pinia";
export const useContextStore = defineStore("context", {
  state: () => {
    return {
      language: "en",
      context: {} as typeof import("@/data/language/tr").default,
    };
  },
  getters: {
    //isAuthenticated: (state) => state.id != "",
  },
  actions: {
    async loadLanguage(language: string) {
      const lang = await getPreferences<string>("language");
      if (lang) this.setLanguage(lang);
      else this.setLanguage(language);
    },
    async setLanguage(language: string) {
      setPreferences("language", language);
      this.language = language;
      if (language == "tr")
        this.context = (await import("@/data/language/tr")).default;
      else this.context = (await import("@/data/language/en")).default;
    },
  },
});
