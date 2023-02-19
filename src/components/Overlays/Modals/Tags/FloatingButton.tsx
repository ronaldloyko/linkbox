import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { type FC } from "react";
import { useAction, useDispatch } from "../../../../store";

export default (function FloatingButton() {
  const dispatch = useDispatch();
  const { toggleSaveTagModal } = useAction();

  function onClick() {
    dispatch(toggleSaveTagModal(true));
  }

  return (
    <IonFab
      style={{ bottom: "24px", right: "24px" }}
      vertical="bottom"
      horizontal="end"
      slot="fixed"
      edge
    >
      <IonFabButton onClick={onClick}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
} as FC);
