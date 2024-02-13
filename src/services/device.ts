import { Device } from "@capacitor/device";

export const getLangCode = function () {
  return Device.getLanguageCode();
};
