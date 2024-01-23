import { Clipboard } from "@capacitor/clipboard";

export const writeClipboard = function (value: string) {
  return Clipboard.write({
    string: value,
  });
};

export const readClipboard = function () {
  return Clipboard.read();
};
