import { Toast } from "@capacitor/toast";

export const showToast = (
  text: string,
  duration: "short" | "long" = "short"
) => {
  return Toast.show({
    text: text,
    duration: duration,
  });
};
