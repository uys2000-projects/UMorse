import { Capacitor } from "@capacitor/core";

export const isApp = function () {
  return Capacitor.isNativePlatform();
};
