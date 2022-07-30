import { IonNote } from "@ionic/react";
import type { FC } from "react";

export default (function ErrorLine({ message }: Properties) {
  return typeof message === "string" && !!message.length ? (
    <IonNote slot="helper" color="danger" style={{ paddingTop: "12px" }}>
      {message}
    </IonNote>
  ) : null;
} as FC<Properties>);

interface Properties {
  message: string | null;
}
