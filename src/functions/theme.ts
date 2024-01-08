import type { Theme } from "../types/Ui";
import { getPrefence, setPrefence } from "../services/prefences";

const setPageTheme = function (theme: Theme) {
  const html = document.querySelector("html");
  if (html) html.dataset.theme = theme;
};
export const setTheme = function (theme: Theme) {
  setPrefence("theme", theme);
  setPageTheme(theme);
};

export const loadTheme = function () {
  return getPrefence<Theme>("theme").then((theme) => {
    if (theme) setPageTheme(theme);
    return theme;
  });
};
