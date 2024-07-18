import { USERSETTINGS } from "@/classes/constants";
import {
  deleteMorseFiles,
  deleteRemoteMorse,
  readAllRemoteMorses,
  readMorseFiles,
  setMorseFile,
  setRemoteMorse,
} from "./morse";
import type { UserSettings } from "@/classes/user";
import { setDoc } from "@/services/db";

export const synchFromRemote = async function () {
  await deleteMorseFiles();
  await readAllRemoteMorses(async (morse) => {
    await setMorseFile(morse);
  });
};

export const synchFromLocale = async function () {
  await readAllRemoteMorses(async (morse) => {
    await deleteRemoteMorse(morse);
  });
  await readMorseFiles(async (morse) => {
    await setRemoteMorse(morse);
  });
};

export const manualSync = async function (lastSync: number) {
  let lastMorse = 0;
  await readMorseFiles(async (morse) => {
    if (morse.utimestamp > lastMorse) lastMorse = morse.utimestamp;
  });

  if (lastSync > lastMorse) await synchFromRemote();
  else await synchFromLocale();
};
export const updateSettings = async function (
  id: string,
  settings: UserSettings
) {
  await setDoc(USERSETTINGS, id, settings);
};
