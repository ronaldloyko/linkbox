import { IonHeader } from "@ionic/react";
import type { FC } from "react";
import Tabs from "./Header/Tabs";
import Title from "./Header/Title";

export default (function Header() {
  return (
    <IonHeader>
      <Title />
      <Tabs />
    </IonHeader>
  );
} as FC);
