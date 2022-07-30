import { IonAlert, useIonToast, type AlertButton } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { TOAST_DURATION, UNSELECTED_ITEM } from "../../../data/constants";
import { useAction, useDispatch, useSelector } from "../../../store";

export default (function DeleteLinkConfirmation() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.deleteLinkConfirmationAlertOpen);
  const selectedLink = useSelector((state) => state.ui.selectedLink);
  const links = useSelector((state) => state.items.links);
  const link = useMemo(
    () => links.find(({ id }) => id === selectedLink),
    [selectedLink, links]
  );
  const { t } = useTranslation();
  const { toggleDeleteLinkConfirmationAlert, setSelectedLink, deleteLink } =
    useAction();
  const [presentToast] = useIonToast();

  if (!link) {
    return null;
  }

  const message = t("overlays.alerts.deleteLinkConfirmation.message", {
    name: link.name,
  });

  const buttons: AlertButton[] = [
    {
      text: t("overlays.alerts.deleteLinkConfirmation.cancel"),
      role: "cancel",
      handler() {
        dispatch(toggleDeleteLinkConfirmationAlert(false));
        dispatch(setSelectedLink(UNSELECTED_ITEM));
      },
    },
    {
      text: t("overlays.alerts.deleteLinkConfirmation.delete"),
      role: "destructive",
      handler() {
        dispatch(deleteLink(link.id));
        dispatch(toggleDeleteLinkConfirmationAlert(false));
        dispatch(setSelectedLink(UNSELECTED_ITEM));
        presentToast({
          message: t("overlays.alerts.deleteLinkConfirmation.toast.message", {
            name: link.name,
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
