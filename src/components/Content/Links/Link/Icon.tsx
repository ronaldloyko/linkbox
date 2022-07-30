import { IonAvatar } from "@ionic/react";
import type { FC } from "react";
import Avatar from "react-avatar";
import type { Name } from "../../../../store/items";

export default (function Icon({ name }: Properties) {
  return (
    <IonAvatar
      slot="start"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar name={name} maxInitials={1} size="32px" textSizeRatio={2} round />
    </IonAvatar>
  );
} as FC<Properties>);

interface Properties {
  name: Name;
}
