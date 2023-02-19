import { IonAlert, useIonToast, type AlertButton } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { TOAST_DURATION, UNSELECTED_ITEM } from "../../../data/constants";
import { useAction, useDispatch, useSelector } from "../../../store";

export default (function DeleteTagConfirmation() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.deleteTagConfirmationAlertOpen);
  const selectedTag = useSelector((state) => state.ui.selectedTag);
  const tags = useSelector((state) => state.items.tags);
  const tag = useMemo(
    () => tags.find(({ id }) => id === selectedTag),
    [selectedTag, tags]
  );
  const { t } = useTranslation();
  const { toggleDeleteTagConfirmationAlert, setSelectedTag, deleteTag } =
    useAction();
  const [presentToast] = useIonToast();

  if (!tag) {
    return null;
  }

  const message = t("overlays.alerts.deleteTagConfirmation.message", {
    name: tag.name,
  });

  const buttons: AlertButton[] = [
    {
      text: t("overlays.alerts.deleteTagConfirmation.cancel"),
      role: "cancel",
      handler() {
        dispatch(toggleDeleteTagConfirmationAlert(false));
        dispatch(setSelectedTag(UNSELECTED_ITEM));
      },
    },
    {
      text: t("overlays.alerts.deleteTagConfirmation.delete"),
      role: "destructive",
      handler() {
        dispatch(deleteTag(tag.id));
        dispatch(toggleDeleteTagConfirmationAlert(false));
        dispatch(setSelectedTag(UNSELECTED_ITEM));
        presentToast({
          message: t("overlays.alerts.deleteTagConfirmation.toast.message", {
            name: tag.name,
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
