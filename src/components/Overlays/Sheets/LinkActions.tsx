import { Share } from "@capacitor/share";
import { IonActionSheet, type ActionSheetButton } from "@ionic/react";
import { close, pencil, share, trash } from "ionicons/icons";
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
import useSanitizedUrl from "../../../hooks/useSanitizedUrl";
import { useAction, useDispatch, useSelector } from "../../../store";

export default (function LinkActions() {
  const dispatch = useDispatch();
  const sanitizedUrl = useSanitizedUrl();
  const open = useSelector((state) => state.ui.linkActionSheetOpen);
  const selectedLink = useSelector((state) => state.ui.selectedLink);
  const links = useSelector((state) => state.items.links);
  const link = useMemo(
    () => links.find(({ id }) => id === selectedLink),
    [selectedLink, links]
  );
  const sanitizedLinkUrl = link?.url ? sanitizedUrl(link.url) : "";
  const { t } = useTranslation();
  const [buttons, setButtons]: [
    ActionSheetButton[],
    Dispatch<SetStateAction<ActionSheetButton[]>>
  ] = useState([] as ActionSheetButton[]);
  const {
    toggleLinkActionSheet,
    toggleSaveLinkModal,
    toggleDeleteLinkConfirmationAlert,
    setSelectedLink,
  } = useAction();

  useEffect(() => {
    async function initialize() {
      setButtons([
        ...((await Share.canShare()).value
          ? [
              {
                text: t("overlays.sheets.linkActions.share.label"),
                icon: share,
                async handler() {
                  if (!link) {
                    return;
                  }

                  await Share.share({
                    title: link.name,
                    url: sanitizedLinkUrl,
                    dialogTitle: t("overlays.sheets.linkActions.share.title"),
                  });
                },
              },
            ]
          : []),
        {
          text: t("overlays.sheets.linkActions.edit"),
          icon: pencil,
          handler() {
            dispatch(toggleSaveLinkModal(true));
          },
        },
        {
          text: t("overlays.sheets.linkActions.delete"),
          role: "destructive",
          icon: trash,
          handler() {
            dispatch(toggleDeleteLinkConfirmationAlert(true));
          },
        },
        {
          text: t("overlays.sheets.linkActions.cancel"),
          role: "cancel",
          icon: close,
          handler() {
            dispatch(setSelectedLink(UNSELECTED_ITEM));
          },
        },
      ]);
    }

    initialize();
  }, [
    dispatch,
    setSelectedLink,
    toggleSaveLinkModal,
    toggleDeleteLinkConfirmationAlert,
    link,
    t,
    sanitizedLinkUrl,
  ]);

  function onCancel() {
    dispatch(toggleLinkActionSheet(false));
  }

  return (
    <IonActionSheet
      isOpen={open}
      buttons={buttons as any}
      onDidDismiss={onCancel}
    />
  );
} as FC);
