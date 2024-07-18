import { Preferences } from "@capacitor/preferences";

export const setPreferences = function (key: string, value: object | string) {
  const _value = typeof value === "string" ? value : JSON.stringify(value);
  return Preferences.set({ key, value: _value });
};

export const getPreferences = function <T>(key: string) {
  return Preferences.get({ key }).then((result) => {
    if (!result.value) return undefined;
    try {
      return JSON.parse(result.value) as T;
    } catch {
      return result.value as T;
    }
  });
};
