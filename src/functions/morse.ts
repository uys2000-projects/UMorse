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

const MorseFolder = "morse/";
const MorseExtension = "umorse";
// local Morse Functions
export const setMorseFile = async function (morse: Morse) {
  const name = `morse/${morse.timestamp}.unote`;
  return await writeFile(name, JSON.stringify(morse));
};
export const readMorseFile = async function (
  fileName: string,
  extension: string = ".unote"
) {
  return await readFile<Morse>("morse/" + fileName + extension);
};
export const deleteMorseFile = async function (
  fileName: string,
  extension: string = ".unote"
) {
  return await deleteFile("morse/" + fileName + extension);
};

export const readMorseFolder = async function (
  callback: (file: FileInfo) => Promise<any>
) {
  const { files } = await readDir(MorseFolder).catch(async () => {
    await createFolder(MorseFolder);
    return readDir(MorseFolder);
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
    await deleteMorseFile(file.name, "");
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
export const deleteRemoteMorse = async function (morse: Morse) {
  await deleteDoc(collection, morse.timestamp.toString());
};
export const readAllRemoteMorses = async function (
  callback: (morse: Morse) => Promise<void>,
  timestamp = 0
) {
  const snapshot = await getOrderedDocs(collection, timestamp);
  if (snapshot.empty) return;

  let _timestamp = timestamp;
  for (let i = 0; i < snapshot.docs.length; i++) {
    const morse = snapshot.docs[i].data() as Morse;
    _timestamp = morse.timestamp;
    await callback(morse);
  }
  await readAllRemoteMorses(callback, _timestamp);
};

// Remote Morse Task

export const createRemoveMorseTask = function (morse: Morse) {};
