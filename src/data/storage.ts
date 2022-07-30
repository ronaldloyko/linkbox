import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Storage } from "@ionic/storage";
import { nanoid } from "nanoid";
import { Folder, Link } from "../store/items";
import {
  AvatarVisibility,
  FirstRunFlag,
  Language,
  LinkSorting,
  Theme,
} from "../store/ui";
import {
  APPLICATION_NAME,
  DEFAULT_FOLDER_ID,
  DEFAULT_FOLDER_NAME,
  DEFAULT_LANGUAGE,
  STORAGE_DATABASE_KEY,
  STORAGE_DATA_KEY,
  VERSION,
} from "./constants";

export enum StorageError {
  InvalidFile = "invalidFile",
  InvalidContent = "invalidContent",
}

class ApplicationStorage {
  static DEFAULT_DATA: Data = {
    links: [],
    folders: [
      {
        id: DEFAULT_FOLDER_ID,
        name: DEFAULT_FOLDER_NAME,
      },
    ],
    language: DEFAULT_LANGUAGE,
    linkSorting: LinkSorting.Default,
    theme: Theme.System,
    showAvatar: true,
    firstRun: true,
  };

  static FILE_DIRECTORY = Directory.ExternalStorage;

  static FILE_ENCODING = Encoding.UTF8;

  private storage: Storage;

  constructor(
    storage: typeof Storage,
    databaseKey: string,
    private dataKey: string
  ) {
    this.storage = new storage({
      dbKey: databaseKey,
      name: databaseKey,
      storeName: databaseKey,
    });
    this.storage.create();
  }

  async get(): Promise<Data> {
    return (
      (await this.storage.get(this.dataKey)) ?? ApplicationStorage.DEFAULT_DATA
    );
  }

  set(data: Data): Promise<Data> {
    return this.storage.set(this.dataKey, data);
  }

  async import(content: FileContent): Promise<any> {
    if (
      content?.meta?.name !== APPLICATION_NAME ||
      !content?.meta?.version ||
      !Array.isArray(content?.data?.folders) ||
      !Array.isArray(content?.data?.links) ||
      typeof content?.data?.language !== "string" ||
      typeof content?.data?.linkSorting !== "string" ||
      typeof content?.data?.showAvatar !== "boolean" ||
      typeof content?.data?.theme !== "string"
    ) {
      throw new Error(StorageError.InvalidContent);
    }

    return this.set(content.data);
  }

  async export(): Promise<string> {
    const data = JSON.stringify({
      meta: {
        name: APPLICATION_NAME,
        version: VERSION,
      },
      data: await this.get(),
    } as FileContent);

    return (
      await Filesystem.writeFile({
        path: `/Download/${APPLICATION_NAME}-${nanoid(8)}.json`,
        directory: ApplicationStorage.FILE_DIRECTORY,
        encoding: ApplicationStorage.FILE_ENCODING,
        data,
      })
    ).uri;
  }
}

export default new ApplicationStorage(
  Storage,
  STORAGE_DATABASE_KEY,
  STORAGE_DATA_KEY
);

interface Data {
  links: Link[];
  folders: Folder[];
  linkSorting: LinkSorting;
  language: Language;
  theme: Theme;
  showAvatar: AvatarVisibility;
  firstRun: FirstRunFlag;
}

interface FileContent {
  meta: Meta;
  data: Data;
}

interface Meta {
  name: typeof APPLICATION_NAME;
  version: typeof VERSION;
}
