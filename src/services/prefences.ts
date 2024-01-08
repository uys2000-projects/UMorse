import { Preferences } from "@capacitor/preferences";

export const setPrefence = function (key: string, value: unknown) {
  return Preferences.set({ key, value: JSON.stringify(value) });
};

export const getPrefence = function <T>(key: string) {
  return Preferences.get({ key }).then(({ value }) =>
    value != null ? (JSON.parse(value) as T) : value
  );
};

export const getPrefenceKeys = function () {
  return Preferences.keys();
};

export const removePrefence = function (key: string) {
  return Preferences.remove({ key });
};

export const clearPrefence = function () {
  return Preferences.clear();
};
