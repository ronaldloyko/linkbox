import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { add, folder, link } from "ionicons/icons";
import type { FC } from "react";
import { useAction, useDispatch } from "../../store";

export default (function FloatingButton() {
  const dispatch = useDispatch();
  const { toggleSaveLinkModal, toggleSaveFolderModal } = useAction();

  function onLinkClick() {
    dispatch(toggleSaveLinkModal());
  }

  function onFolderClick() {
    dispatch(toggleSaveFolderModal());
  }

  return (
    <IonFab
      style={{ bottom: "24px", right: "24px" }}
      vertical="bottom"
      horizontal="end"
      slot="fixed"
      edge
    >
      <IonFabButton>
        <IonIcon icon={add} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton onClick={onLinkClick}>
          <IonIcon icon={link} />
        </IonFabButton>
        <IonFabButton onClick={onFolderClick}>
          <IonIcon icon={folder} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
} as FC);
