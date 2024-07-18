import { Clipboard } from "@capacitor/clipboard";

export const readClipboard = function () {
  return Clipboard.read().then((result) =>
    result.type != "image" ? result.value : undefined
  );
};

export const writeClipboard = function (text: string) {
  return Clipboard.write({ string: text });
};
