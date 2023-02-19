import { Haptics, NotificationType } from "@capacitor/haptics";
import { IonActionSheet, type ActionSheetButton } from "@ionic/react";
import { close, pencil, trash } from "ionicons/icons";
import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import { UNSELECTED_ITEM } from "../../../data/constants";
import { useAction, useDispatch, useSelector } from "../../../store";

export default (function TagActions() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.tagActionSheetOpen);
  const selectedTag = useSelector((state) => state.ui.selectedTag);
  const tags = useSelector((state) => state.items.tags);
  const tag = useMemo(
    () => tags.find(({ id }) => id === selectedTag),
    [selectedTag, tags]
  );
  const { t } = useTranslation();
  const [buttons, setButtons]: [
    ActionSheetButton[],
    Dispatch<SetStateAction<ActionSheetButton[]>>
  ] = useState([] as ActionSheetButton[]);
  const {
    toggleTagActionSheet,
    toggleSaveTagModal,
    toggleDeleteTagConfirmationAlert,
    setSelectedTag,
  } = useAction();

  useEffect(() => {
    async function initialize() {
      setButtons([
        {
          text: t("overlays.sheets.tagActions.edit"),
          icon: pencil,
          handler() {
            dispatch(toggleSaveTagModal(true));
          },
        },
        {
          text: t("overlays.sheets.tagActions.delete"),
          role: "destructive",
          icon: trash,
          handler() {
            Haptics.notification({ type: NotificationType.Warning });
            dispatch(toggleDeleteTagConfirmationAlert(true));
          },
        },
        {
          text: t("overlays.sheets.tagActions.cancel"),
          role: "cancel",
          icon: close,
          handler() {
            dispatch(setSelectedTag(UNSELECTED_ITEM));
          },
        },
      ]);
    }

    initialize();
  }, [
    dispatch,
    setSelectedTag,
    toggleSaveTagModal,
    toggleDeleteTagConfirmationAlert,
    tag,
    t,
  ]);

  function onCancel() {
    dispatch(toggleTagActionSheet(false));
  }

  return (
    <IonActionSheet isOpen={open} buttons={buttons} onDidDismiss={onCancel} />
  );
} as FC);
