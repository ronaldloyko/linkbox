import {
  IonRefresher,
  IonRefresherContent,
  type RefresherEventDetail,
} from "@ionic/react";
import type { FC } from "react";
import { useDispatch } from "../../store";
import { loadDataFromStorage } from "../../store/thunks";

export default (function Refresher() {
  const dispatch = useDispatch();

  async function onRefresh(event: CustomEvent<RefresherEventDetail>) {
    await dispatch(loadDataFromStorage());
    event.detail.complete();
  }

  return (
    <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
  );
} as FC);
