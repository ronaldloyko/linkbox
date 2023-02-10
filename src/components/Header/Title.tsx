import {
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { search, settings, pricetag } from "ionicons/icons";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAction, useDispatch, useSelector } from "../../store";

export default (function Title() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toggleSearchModal, toggleSettingsModal, toggleTagsModal } =
    useAction();
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const useTags = useSelector((state) => state.ui.useTags);

  return (
    <IonToolbar style={{ paddingTop: statusBarHeight }}>
      <IonTitle>{t("heading")}</IonTitle>
      <IonButtons slot="primary">
        <IonButton onClick={() => dispatch(toggleSearchModal(true))}>
          <IonIcon slot="icon-only" icon={search}></IonIcon>
        </IonButton>
        {useTags && (
          <IonButton onClick={() => dispatch(toggleTagsModal(true))}>
            <IonIcon slot="icon-only" icon={pricetag}></IonIcon>
          </IonButton>
        )}
        <IonButton onClick={() => dispatch(toggleSettingsModal(true))}>
          <IonIcon slot="icon-only" icon={settings}></IonIcon>
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
} as FC);
