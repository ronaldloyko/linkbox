import { IonActionSheet, type ActionSheetButton } from "@ionic/react";
import { close, pencil, trash } from "ionicons/icons";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_FOLDER_ID, UNSELECTED_ITEM } from "../../../data/constants";
import { useAction, useDispatch, useSelector } from "../../../store";

export default (function FolderActions() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.folderActionSheetOpen);
  const selectedFolder = useSelector((state) => state.ui.selectedFolder);
  const { t } = useTranslation();
  const {
    toggleFolderActionSheet,
    toggleSaveFolderModal,
    toggleDeleteFolderConfirmationAlert,
    setSelectedFolder,
  } = useAction();

  const buttons: ActionSheetButton[] = [
    {
      text: t("overlays.sheets.folderActions.edit"),
      icon: pencil,
      handler() {
        dispatch(toggleSaveFolderModal(true));
      },
    },
    ...(selectedFolder === DEFAULT_FOLDER_ID
      ? []
      : [
          {
            text: t("overlays.sheets.folderActions.delete"),
            role: "destructive",
            icon: trash,
            handler() {
              dispatch(toggleDeleteFolderConfirmationAlert(true));
            },
          },
        ]),
    {
      text: t("overlays.sheets.folderActions.cancel"),
      role: "cancel",
      icon: close,
      handler() {
        dispatch(setSelectedFolder(UNSELECTED_ITEM));
      },
    },
  ];

  function onCancel() {
    dispatch(toggleFolderActionSheet(false));
  }

  return (
    <IonActionSheet isOpen={open} buttons={buttons} onDidDismiss={onCancel} />
  );
} as FC);
