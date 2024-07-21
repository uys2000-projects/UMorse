import { Device } from "@capacitor/device";

export const getDeviceInfo = function () {
  return Device.getInfo();
};

export const getDevicePlatformInfo = async function () {
  return (await Device.getInfo()).platform;
};

export const getDeviceLanguage = async function () {
  return (await Device.getLanguageCode()).value;
};
