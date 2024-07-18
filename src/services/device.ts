import { Device } from "@capacitor/device";

export const getDeviceInfo = function () {
  return Device.getInfo();
};

export const getDevicePlatformInfo = function () {
  return Device.getInfo().then((device) => device.platform);
};
