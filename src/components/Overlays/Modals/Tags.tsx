import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useAction, useDispatch } from "../../../store";

export default (function Tags() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.tagsModalOpen);
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const { t } = useTranslation();
  const { toggleTagsModal } = useAction();

  function onCancel() {
    dispatch(toggleTagsModal(false));
  }

  return (
    <IonModal isOpen={open} onIonModalDidDismiss={onCancel}>
      <IonHeader style={{ paddingTop: statusBarHeight }}>
        <IonToolbar>
          <IonTitle>{t("overlays.modals.tagManager.title")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>
              {t("overlays.modals.search.cancel")}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </IonModal>
  );
} as FC);
