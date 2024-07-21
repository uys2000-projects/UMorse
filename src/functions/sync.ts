import { USERSETTINGS } from "@/classes/constants";
import {
  deleteMorseFiles,
  deleteRemoteMorse,
  deleteRemoveTask,
  readAllRemoteMorses,
  readMorseFiles,
  readRemoveTaskFolder,
  setMorseFile,
  setRemoteMorse,
} from "./morse";
import type { UserSettings } from "@/classes/user";
import { setDoc } from "@/services/db";

export const syncRemoveTasks = async function () {
  await readRemoveTaskFolder(async (file) => {
    await deleteRemoteMorse(file.name);
    await deleteRemoveTask(file.name);
  });
};
export const synchFromRemote = async function (id: string) {
  await syncRemoveTasks();
  await deleteMorseFiles();
  await readAllRemoteMorses(id, async (morse) => {
    await setMorseFile(morse);
  });
};

export const synchFromLocale = async function (id: string) {
  await syncRemoveTasks();
  await readAllRemoteMorses(id, async (morse) => {
    await deleteRemoteMorse(morse.timestamp.toString());
  });
  await readMorseFiles(async (morse) => {
    morse.uid = id;
    await setRemoteMorse(morse);
  });
};

export const checkSyncMethod = async function (lastSync: number) {
  let lastMorse = 0;
  await readMorseFiles(async (morse) => {
    if (morse.utimestamp > lastMorse) lastMorse = morse.utimestamp;
  });
  return lastSync > lastMorse ? "remote" : "local";
};

export const updateSettings = async function (
  id: string,
  settings: UserSettings
) {
  await setDoc(USERSETTINGS, id, settings);
};
