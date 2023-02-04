import { IonList } from "@ionic/react";
import type { FC } from "react";
import type { Link as LinkType } from "../../../../store/items";
import LinkItem from "../../../Content/Links/Link";

export default (function Links({ links }: Properties) {
  return (
    <IonList lines="none">
      {links.map(({ id, name, url, description }) => (
        <LinkItem
          key={id}
          id={id}
          name={name}
          url={url}
          description={description}
        />
      ))}
    </IonList>
  );
} as FC<Properties>);

interface Properties {
  links: LinkType[];
}
