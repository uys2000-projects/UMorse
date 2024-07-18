import { Share } from "@capacitor/share";

export const share = function (
  dialogTitle: string,
  title: string,
  text: string,
  url: string
) {
  return Share.share({
    dialogTitle: dialogTitle,
    title: title,
    text: text,
    url: url,
  });
};
