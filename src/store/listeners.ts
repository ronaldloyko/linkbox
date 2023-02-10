import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import storage from "../data/storage";
import store from "../store";
import items from "./items";
import ui from "./ui";

const listeners = createListenerMiddleware();

export default listeners;

listeners.startListening({
  matcher: isAnyOf(
    items.actions.addFolder,
    items.actions.addLink,
    items.actions.addTag,
    items.actions.deleteFolder,
    items.actions.deleteLink,
    items.actions.deleteTag,
    items.actions.editFolder,
    items.actions.editLink,
    items.actions.editTag,
    ui.actions.setLanguage,
    ui.actions.setLinkSorting,
    ui.actions.setTheme,
    ui.actions.toggleShowAvatar,
    ui.actions.toggleShowDescription,
    ui.actions.toggleUseTags,
    ui.actions.toggleFirstRun
  ),
  effect(_, api) {
    const state = api.getState() as ReturnType<typeof store.getState>;

    storage.set({
      folders: state.items.folders,
      links: state.items.links,
      tags: state.items.tags,
      linkSorting: state.ui.linkSorting,
      language: state.ui.language,
      theme: state.ui.theme,
      showAvatar: state.ui.showAvatar,
      showDescription: state.ui.showDescription,
      useTags: state.ui.useTags,
      firstRun: state.ui.firstRun,
    });
  },
});
