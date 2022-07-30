import { IonAlert, useIonToast, type AlertButton } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_FOLDER_ID,
  TOAST_DURATION,
  UNSELECTED_ITEM,
} from "../../../data/constants";
import { useAction, useDispatch, useSelector } from "../../../store";

export default (function DeleteFolderConfirmation() {
  const dispatch = useDispatch();
  const open = useSelector(
    (state) => state.ui.deleteFolderConfirmationAlertOpen
  );
  const selectedFolder = useSelector((state) => state.ui.selectedFolder);
  const folders = useSelector((state) => state.items.folders);
  const folder = useMemo(
    () => folders.find(({ id }) => id === selectedFolder),
    [selectedFolder, folders]
  );
  const { t } = useTranslation();
  const {
    toggleDeleteFolderConfirmationAlert,
    setSelectedFolder,
    setCurrentFolder,
    deleteFolder,
  } = useAction();
  const [presentToast] = useIonToast();

  if (!folder) {
    return null;
  }

  const message = t("overlays.alerts.deleteFolderConfirmation.message", {
    name: folder.name,
  });

  const buttons: AlertButton[] = [
    {
      text: t("overlays.alerts.deleteFolderConfirmation.cancel"),
      role: "cancel",
      handler() {
        dispatch(toggleDeleteFolderConfirmationAlert(false));
        dispatch(setSelectedFolder(UNSELECTED_ITEM));
      },
    },
    {
      text: t("overlays.alerts.deleteFolderConfirmation.delete"),
      role: "destructive",
      handler() {
        dispatch(setCurrentFolder(DEFAULT_FOLDER_ID));
        dispatch(deleteFolder(folder.id));
        dispatch(toggleDeleteFolderConfirmationAlert(false));
        dispatch(setSelectedFolder(UNSELECTED_ITEM));
        presentToast({
          message: t("overlays.alerts.deleteFolderConfirmation.toast.message", {
            name: folder.name,
          }),
          duration: TOAST_DURATION,
          icon: checkmark,
        });
      },
    },
  ];

  return (
    <IonAlert isOpen={open} buttons={buttons} message={message}></IonAlert>
  );
} as FC);
