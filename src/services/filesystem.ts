import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const readDir = function (name: string) {
  return Filesystem.readdir({
    path: name,
    directory: Directory.Documents,
  });
};

export const writeFile = function (name: string, content: string) {
  return Filesystem.writeFile({
    path: name,
    data: content,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

export const readFile = function <T>(name: string) {
  return Filesystem.readFile({
    path: name,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  }).then((result) =>
    result.data ? (JSON.parse(result.data as string) as T) : undefined
  );
};

export const deleteFile = function (name: string) {
  return Filesystem.deleteFile({
    path: name,
    directory: Directory.Documents,
  });
};

export const createFolder = function (name: string) {
  return Filesystem.mkdir({
    path: name,
    directory: Directory.Documents,
  });
};
