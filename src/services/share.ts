import { Share } from "@capacitor/share";

export const share = function (text: string) {
  return Share.share({ text: text });
};
