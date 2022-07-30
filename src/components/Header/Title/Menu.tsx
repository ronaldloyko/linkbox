import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { search, settings } from "ionicons/icons";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAction, useDispatch, useSelector } from "../../../store";

export default (function Menu({ triggerEvent }: Properties) {
  const open = useSelector((state) => state.ui.menuOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toggleMenu, toggleSearchModal, toggleSettingsModal } = useAction();

  function onCancel() {
    dispatch(toggleMenu(false));
  }

  function onToggleSearchModal() {
    dispatch(toggleSearchModal(true));
  }

  function onToggleSettingsModal() {
    dispatch(toggleSettingsModal(true));
  }

  return (
    <IonPopover
      reference="event"
      event={triggerEvent}
      isOpen={open}
      onIonPopoverDidDismiss={onCancel}
      dismissOnSelect
    >
      <IonContent>
        <IonList lines="none">
          <IonItem button onClick={onToggleSearchModal}>
            <IonIcon slot="start" icon={search} />
            <IonLabel>{t("header.menu.search")}</IonLabel>
          </IonItem>
          <IonItem button onClick={onToggleSettingsModal}>
            <IonIcon slot="start" icon={settings} />
            <IonLabel>{t("header.menu.settings")}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPopover>
  );
} as FC<Properties>);

interface Properties {
  triggerEvent?: MouseEvent;
}
