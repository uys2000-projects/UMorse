import type { User } from "firebase/auth";

import { UserSettings } from "@/classes/user";
import { defineStore } from "pinia";
import { getPreferences, setPreferences } from "@/services/preferences";
import { Morse } from "@/classes/morse";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      id: "",
      settings: new UserSettings(),
      lastMorse: new Morse(),
    };
  },
  getters: {
    isAuthenticated: (state) => state.id != "",

    theme: (state) => state.settings.theme,
    autoSync: (state) => state.settings.autoSync,
    rememberLastTranslate: (state) => state.settings.rememberLastTranslate,
    rememberCustomizations: (state) => state.settings.rememberCustomizations,
    lastSync: (state) => state.settings.lastSync,
  },
  actions: {
    setUser(user: User) {
      this.id = user.uid;
    },
    removeUser() {
      this.id = "";
    },
    setTheme(value: string) {
      this.settings.theme = value;
      this.updateSettings();
    },
    setAutoSync(value: boolean) {
      this.settings.autoSync = value;
      this.updateSettings();
    },
    setRememberLastTranslate(value: boolean) {
      this.settings.rememberLastTranslate = value;
      this.updateSettings();
    },
    setRememberCustomizations(value: boolean) {
      this.settings.rememberCustomizations = value;
      this.updateSettings();
    },
    setLastSync(value = Date.now()) {
      this.settings.lastSync = value;
      this.updateSettings();
    },
    setSettings(settings: UserSettings) {
      this.settings = settings;
    },
    updateSettings() {
      setPreferences("settings", this.settings);
    },
    async loadSettings() {
      return await getPreferences<UserSettings>("settings").then((settings) => {
        if (settings) this.settings = settings;
      });
    },
  },
});
