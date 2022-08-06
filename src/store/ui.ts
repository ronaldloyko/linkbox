import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_FOLDER_ID,
  DEFAULT_LANGUAGE,
  EMPTY_TEXT,
} from "../data/constants";
import type { Id, Name, Url } from "./items";
import { loadDataFromStorage } from "./thunks";

export enum LinkSorting {
  Default = "default",
  Reversed = "reversed",
  Alphabetically = "alphabetically",
}

export enum Theme {
  System = "system",
  Light = "light",
  Dark = "dark",
}

export default createSlice({
  name: "ui",
  initialState: {
    menuOpen: false,
    settingsModalOpen: false,
    searchModalOpen: false,
    saveLinkModalOpen: false,
    saveFolderModalOpen: false,
    folderActionSheetOpen: false,
    linkActionSheetOpen: false,
    deleteFolderConfirmationAlertOpen: false,
    deleteLinkConfirmationAlertOpen: false,
    currentFolder: DEFAULT_FOLDER_ID,
    selectedLink: null,
    selectedFolder: null,
    linkSorting: LinkSorting.Default,
    language: DEFAULT_LANGUAGE,
    theme: Theme.System,
    showAvatar: true,
    firstRun: false,
    prefilledName: EMPTY_TEXT,
    prefilledUrl: EMPTY_TEXT,
  } as State,
  reducers: {
    toggleMenu(state, { payload }: PayloadAction<OptionalToggleParameter>) {
      state.menuOpen = payload ?? !state.menuOpen;
    },
    toggleSettingsModal(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.settingsModalOpen = payload ?? !state.settingsModalOpen;
    },
    toggleSearchModal(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.searchModalOpen = payload ?? !state.searchModalOpen;
    },
    toggleSaveLinkModal(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.saveLinkModalOpen = payload ?? !state.saveLinkModalOpen;
    },
    toggleSaveFolderModal(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.saveFolderModalOpen = payload ?? !state.saveFolderModalOpen;
    },
    toggleFolderActionSheet(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.folderActionSheetOpen = payload ?? !state.folderActionSheetOpen;
    },
    toggleLinkActionSheet(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.linkActionSheetOpen = payload ?? !state.linkActionSheetOpen;
    },
    toggleDeleteFolderConfirmationAlert(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.deleteFolderConfirmationAlertOpen =
        payload ?? !state.deleteFolderConfirmationAlertOpen;
    },
    toggleDeleteLinkConfirmationAlert(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.deleteLinkConfirmationAlertOpen =
        payload ?? !state.deleteLinkConfirmationAlertOpen;
    },
    setCurrentFolder(state, { payload }: PayloadAction<Id>) {
      state.currentFolder = payload;
    },
    setSelectedLink(state, { payload }: PayloadAction<SelectedItem>) {
      state.selectedLink = payload;
    },
    setSelectedFolder(state, { payload }: PayloadAction<SelectedItem>) {
      state.selectedFolder = payload;
    },
    setLinkSorting(state, { payload }: PayloadAction<LinkSorting>) {
      state.linkSorting = payload;
    },
    setLanguage(state, { payload }: PayloadAction<Language>) {
      state.language = payload;
    },
    setTheme(state, { payload }: PayloadAction<Theme>) {
      state.theme = payload;
    },
    toggleShowAvatar(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.showAvatar = payload ?? !state.showAvatar;
    },
    toggleFirstRun(state, { payload }: PayloadAction<OptionalToggleParameter>) {
      state.firstRun = payload ?? !state.firstRun;
    },
    prefillName(state, { payload }: PayloadAction<Name>) {
      state.prefilledName = payload;
    },
    prefillUrl(state, { payload }: PayloadAction<Url>) {
      state.prefilledUrl = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadDataFromStorage.fulfilled, (state, { payload }) => {
      state.language = payload.language;
      state.linkSorting = payload.linkSorting;
      state.theme = payload.theme;
      state.showAvatar = payload.showAvatar;
      state.firstRun = payload.firstRun;
    });
  },
});

export type Language = string;

export type AvatarVisibility = boolean;

export type FirstRunFlag = boolean;

interface State {
  menuOpen: OverlayVisibility;
  settingsModalOpen: OverlayVisibility;
  searchModalOpen: OverlayVisibility;
  saveLinkModalOpen: OverlayVisibility;
  saveFolderModalOpen: OverlayVisibility;
  folderActionSheetOpen: OverlayVisibility;
  linkActionSheetOpen: OverlayVisibility;
  deleteFolderConfirmationAlertOpen: OverlayVisibility;
  deleteLinkConfirmationAlertOpen: OverlayVisibility;
  currentFolder: Id;
  selectedLink: SelectedItem;
  selectedFolder: SelectedItem;
  linkSorting: LinkSorting;
  language: Language;
  theme: Theme;
  showAvatar: AvatarVisibility;
  firstRun: FirstRunFlag;
  prefilledName: Name;
  prefilledUrl: Url;
}

type OverlayVisibility = boolean;

type OptionalToggleParameter = boolean | undefined;

type SelectedItem = Id | null;
