import {
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useState, type FC, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAction, useDispatch, useSelector } from "../../store";
import Menu from "./Title/Menu";

export default (function Title() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toggleMenu } = useAction();
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const [menuTriggerEvent, setMenuTriggerEvent] = useState<MouseEvent>();

  function onMenuClick(event: MouseEvent) {
    setMenuTriggerEvent(event);
    dispatch(toggleMenu(true));
  }
  return (
    <IonToolbar style={{ paddingTop: statusBarHeight }}>
      <IonTitle>{t("header.title")}</IonTitle>
      <IonButtons slot="primary">
        <IonButton onClick={onMenuClick}>
          <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
        </IonButton>
      </IonButtons>
      <Menu triggerEvent={menuTriggerEvent} />
    </IonToolbar>
  );
} as FC);
