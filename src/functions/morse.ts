import type { Morse } from "@/classes/morse";
import type { FileInfo } from "@capacitor/filesystem";

import { DIARIES } from "@/classes/constants";
import { deleteDoc, getDoc, getOrderedDocs, setDoc } from "@/services/db";
import {
  createFolder,
  deleteFile,
  readDir,
  readFile,
  writeFile,
} from "@/services/filesystem";

const mFolder = "morse";
const mExtension = "umorse";
// local Morse Functions
export const setMorseFile = async function (morse: Morse) {
  const name = `${mFolder}/${morse.timestamp}.${mExtension}`;
  return await writeFile(name, JSON.stringify(morse));
};
export const readMorseFile = async function (
  fileName: string,
  extension: string = mExtension
) {
  const name = extension
    ? `${mFolder}/${fileName}.${mExtension}`
    : `${mFolder}/${fileName}`;
  return await readFile<Morse>(name);
};
export const deleteMorseFile = async function (
  fileName: string,
  extension: string = mExtension,
  removeTask = true
) {
  if (removeTask) setRemoveTask(fileName);
  const name = extension
    ? `${mFolder}/${fileName}.${mExtension}`
    : `${mFolder}/${fileName}`;
  return await deleteFile(name);
};

export const readMorseFolder = async function (
  callback: (file: FileInfo) => Promise<any>
) {
  const { files } = await readDir(mFolder).catch(async () => {
    await createFolder(mFolder);
    return readDir(mFolder);
  });
  for (let index = 0; index < files.length; index++) {
    await callback(files[index]);
  }
};

export const setMorseFiles = async function (morses: Morse[]) {
  for (let index = 0; index < morses.length; index++) {
    await setMorseFile(morses[index]);
  }
};
export const readMorseFiles = async function (
  callback: (morse: Morse) => Promise<void>
) {
  await readMorseFolder(async (file) => {
    const morse = await readMorseFile(file.name, "");
    if (morse) await callback(morse);
  });
};
export const deleteMorseFiles = async function () {
  await readMorseFolder(async (file) => {
    await deleteMorseFile(file.name, "", false);
  });
};

// Remote Morse Functions
const collection = DIARIES;

export const setRemoteMorse = async function (morse: Morse) {
  await setDoc(collection, morse.timestamp.toString(), morse);
};
export const getRemoteMorse = async function (timestamp: number) {
  const snapshot = await getDoc(collection, timestamp.toString());
  if (snapshot.exists()) return snapshot.data() as Morse;
  else return undefined;
};
export const deleteRemoteMorse = async function (id: string) {
  await deleteDoc(collection, id);
};
export const readAllRemoteMorses = async function (
  id: string,
  callback: (morse: Morse) => Promise<void>,
  timestamp = 0
) {
  const snapshot = await getOrderedDocs(collection, id, timestamp);
  if (snapshot.empty) return;

  let _timestamp = timestamp;
  for (let i = 0; i < snapshot.docs.length; i++) {
    const morse = snapshot.docs[i].data() as Morse;
    _timestamp = morse.timestamp;
    await callback(morse);
  }
  await readAllRemoteMorses(id, callback, _timestamp);
};

// Remote Morse Task

const rtFolder = "rt";

export const setRemoveTask = async function (fileName: string) {
  const name = `${rtFolder}/${fileName}`;
  return await writeFile(name, "");
};

export const deleteRemoveTask = async function (fileName: string) {
  const name = `${rtFolder}/${fileName}`;
  return await deleteFile(name);
};

export const readRemoveTaskFolder = async function (
  callback: (file: FileInfo) => Promise<any>
) {
  const { files } = await readDir(rtFolder).catch(async () => {
    await createFolder(rtFolder);
    return readDir(rtFolder);
  });
  for (let index = 0; index < files.length; index++) {
    await callback(files[index]);
  }
};
