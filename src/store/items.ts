import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadDataFromStorage } from "./thunks";

export default createSlice({
  name: "items",
  initialState: {
    folders: [],
    links: [],
    tags: [],
  } as State,
  reducers: {
    addLink(state, { payload }: PayloadAction<Link>) {
      state.links.push(payload);
    },
    addFolder(state, { payload }: PayloadAction<Folder>) {
      state.folders.push(payload);
    },
    addTag(state, { payload }: PayloadAction<Tag>) {
      state.tags.push(payload);
    },
    editLink(state, { payload }: PayloadAction<Link>) {
      state.links = state.links.map((link) =>
        link.id === payload.id ? payload : link
      );
    },
    editFolder(state, { payload }: PayloadAction<Folder>) {
      state.folders = state.folders.map((folder) =>
        folder.id === payload.id ? payload : folder
      );
    },
    editTag(state, { payload }: PayloadAction<Tag>) {
      state.tags = state.tags.map((tag) =>
        tag.id === payload.id ? payload : tag
      );
    },
    deleteLink(state, { payload }: PayloadAction<Id>) {
      state.links = state.links.filter(({ id }) => id !== payload);
    },
    deleteFolder(state, { payload }: PayloadAction<Id>) {
      state.links = state.links.filter(({ folder }) => folder !== payload);
      state.folders = state.folders.filter(({ id }) => id !== payload);
    },
    deleteTag(state, { payload }: PayloadAction<Id>) {
      state.links = state.links.map((link) => {
        link.tags = link.tags.filter((tag) => tag !== payload);
        return link;
      });
      state.tags = state.tags.filter(({ id }) => id !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadDataFromStorage.fulfilled, (state, { payload }) => {
      state.folders = payload.folders;
      state.links = payload.links;
      state.tags = payload.tags;
    });
  },
});

interface State {
  links: Link[];
  folders: Folder[];
  tags: Tag[];
}

export interface Folder {
  id: Id;
  name: Name;
}

export interface Tag {
  id: Id;
  name: Name;
}

export interface Link {
  id: Id;
  name: Name;
  url: Url;
  description: Description;
  folder: Id;
  tags: Id[];
}

export type Id = string;

export type Name = string;

export type Url = string;

export type Description = string;
