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
    settingsModalOpen: false,
    tagsModalOpen: false,
    searchModalOpen: false,
    saveLinkModalOpen: false,
    saveFolderModalOpen: false,
    saveTagModalOpen: false,
    folderActionSheetOpen: false,
    linkActionSheetOpen: false,
    tagActionSheetOpen: false,
    deleteFolderConfirmationAlertOpen: false,
    deleteLinkConfirmationAlertOpen: false,
    deleteTagConfirmationAlertOpen: false,
    currentFolder: DEFAULT_FOLDER_ID,
    selectedLink: null,
    selectedFolder: null,
    selectedTag: null,
    linkSorting: LinkSorting.Default,
    language: DEFAULT_LANGUAGE,
    theme: Theme.System,
    showAvatar: true,
    showDescription: false,
    useTags: false,
    firstRun: false,
    prefilledName: EMPTY_TEXT,
    prefilledUrl: EMPTY_TEXT,
    statusBarHeight: "0px",
  } as State,
  reducers: {
    toggleSettingsModal(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.settingsModalOpen = payload ?? !state.settingsModalOpen;
    },
    toggleTagsModal(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.tagsModalOpen = payload ?? !state.tagsModalOpen;
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
    toggleSaveTagModal(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.saveTagModalOpen = payload ?? !state.saveTagModalOpen;
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
    toggleTagActionSheet(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.tagActionSheetOpen = payload ?? !state.tagActionSheetOpen;
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
    toggleDeleteTagConfirmationAlert(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.deleteTagConfirmationAlertOpen =
        payload ?? !state.deleteTagConfirmationAlertOpen;
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
    setSelectedTag(state, { payload }: PayloadAction<SelectedItem>) {
      state.selectedTag = payload;
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
    toggleShowDescription(
      state,
      { payload }: PayloadAction<OptionalToggleParameter>
    ) {
      state.showDescription = payload ?? !state.showDescription;
    },
    toggleUseTags(state, { payload }: PayloadAction<OptionalToggleParameter>) {
      state.useTags = payload ?? !state.useTags;
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
    setStatusBarHeight(state, { payload }: PayloadAction<StatusBarHeight>) {
      state.statusBarHeight = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadDataFromStorage.fulfilled, (state, { payload }) => {
      state.language = payload.language;
      state.linkSorting = payload.linkSorting;
      state.theme = payload.theme;
      state.showAvatar = payload.showAvatar;
      state.showDescription = payload.showDescription;
      state.useTags = payload.useTags;
      state.firstRun = payload.firstRun;
    });
  },
});

export type Language = string;

export type AvatarVisibility = boolean;

export type DescriptionVisibility = boolean;

export type TagsUsageFlag = boolean;

export type FirstRunFlag = boolean;

interface State {
  settingsModalOpen: OverlayVisibility;
  tagsModalOpen: OverlayVisibility;
  searchModalOpen: OverlayVisibility;
  saveLinkModalOpen: OverlayVisibility;
  saveFolderModalOpen: OverlayVisibility;
  saveTagModalOpen: OverlayVisibility;
  folderActionSheetOpen: OverlayVisibility;
  linkActionSheetOpen: OverlayVisibility;
  tagActionSheetOpen: OverlayVisibility;
  deleteFolderConfirmationAlertOpen: OverlayVisibility;
  deleteLinkConfirmationAlertOpen: OverlayVisibility;
  deleteTagConfirmationAlertOpen: OverlayVisibility;
  currentFolder: Id;
  selectedLink: SelectedItem;
  selectedFolder: SelectedItem;
  selectedTag: SelectedItem;
  linkSorting: LinkSorting;
  language: Language;
  theme: Theme;
  showAvatar: AvatarVisibility;
  showDescription: DescriptionVisibility;
  useTags: TagsUsageFlag;
  firstRun: FirstRunFlag;
  prefilledName: Name;
  prefilledUrl: Url;
  statusBarHeight: StatusBarHeight;
}

type OverlayVisibility = boolean;

type OptionalToggleParameter = boolean | undefined;

type SelectedItem = Id | null;

type StatusBarHeight = string;
