import { IonLabel, IonSegmentButton } from "@ionic/react";
import { useRef, type FC } from "react";
import useOnPress from "../../../hooks/useOnPress";
import { useAction, useDispatch } from "../../../store";

export default (function Tab({ id, value }: Properties) {
  const dispatch = useDispatch();
  const element = useRef<HTMLIonSegmentButtonElement>(null!);
  const { toggleFolderActionSheet, setSelectedFolder } = useAction();

  useOnPress(element, () => {
    dispatch(setSelectedFolder(id));
    dispatch(toggleFolderActionSheet(true));
  });

  return (
    <IonSegmentButton value={id} id={id} ref={element}>
      <IonLabel>{value}</IonLabel>
    </IonSegmentButton>
  );
} as FC<Properties>);

interface Properties {
  id: string;
  value: string;
}
