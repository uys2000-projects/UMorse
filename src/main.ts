import { setDebugMode } from "u-logger";

import "./app.css";
import App from "./App.svelte";

setDebugMode(true);
const app = new App({
  target: document.getElementById("app") as HTMLElement,
});

export default app;
