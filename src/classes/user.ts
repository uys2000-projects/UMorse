export class UserSettings {
  theme!: string;

  autoSync!: boolean;
  rememberLastTranslate!: boolean;
  rememberCustomizations!: boolean;

  dot!: string;
  dash!: string;
  slash!: string;

  lastSync!: number;

  constructor(
    theme = "light",
    autoSync = false,
    rememberLastTranslate = false,
    rememberCustomizations = false,

    dot = ".",
    dash = "-",
    slash = "/",

    lastSync = 0
  ) {
    this.theme = theme;
    this.autoSync = autoSync;
    this.rememberLastTranslate = rememberLastTranslate;
    this.rememberCustomizations = rememberCustomizations;

    this.dot = dot;
    this.dash = dash;
    this.slash = slash;

    this.lastSync = lastSync;
  }
}
