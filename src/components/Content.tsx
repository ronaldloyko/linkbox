import { IonContent } from "@ionic/react";
import type { FC } from "react";
import FloatingButton from "./Content/FloatingButton";
import Links from "./Content/Links";
import Refresher from "./Content/Refresher";

export default (function Content() {
  return (
    <IonContent fullscreen>
      <Refresher />
      <FloatingButton />
      <Links />
    </IonContent>
  );
} as FC);
