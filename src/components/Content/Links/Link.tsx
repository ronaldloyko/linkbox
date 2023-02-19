import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { IonChip, IonItem, IonLabel } from "@ionic/react";
import { useMemo, useRef, type FC } from "react";
import { URL_TARGET } from "../../../data/constants";
import useOnPress from "../../../hooks/useOnPress";
import useSanitizedUrl from "../../../hooks/useSanitizedUrl";
import { useAction, useDispatch, useSelector } from "../../../store";
import type { Description, Id, Name, Url } from "../../../store/items";
import Icon from "./Link/Icon";

export default (function Link({
  id,
  url,
  name,
  description,
  tags,
}: Properties) {
  const dispatch = useDispatch();
  const sanitizedUrl = useSanitizedUrl();
  const element = useRef<HTMLIonItemElement>(null!);
  const showAvatar = useSelector((state) => state.ui.showAvatar);
  const showDescription = useSelector((state) => state.ui.showDescription);
  const useTags = useSelector((state) => state.ui.useTags);
  const availableTags = useSelector((state) => state.items.tags);
  const { toggleLinkActionSheet, setSelectedLink } = useAction();

  const tagNames = useMemo(
    () =>
      tags.map(
        (tag) =>
          availableTags.find((availableTag) => availableTag.id === tag)?.name
      ),
    [tags, availableTags]
  );

  function onClick() {
    window.open(sanitizedUrl(url), URL_TARGET);
  }

  useOnPress(element, () => {
    Haptics.impact({ style: ImpactStyle.Medium });
    dispatch(setSelectedLink(id));
    dispatch(toggleLinkActionSheet(true));
  });

  return (
    <IonItem button onClick={onClick} ref={element}>
      {showAvatar && <Icon name={name} />}
      <IonLabel>
        {name}
        {showDescription && <p>{description}</p>}
      </IonLabel>
      {useTags && (
        <p slot="end">
          {tagNames.map((tagName) => (
            <IonChip>{tagName}</IonChip>
          ))}
        </p>
      )}
    </IonItem>
  );
} as FC<Properties>);

interface Properties {
  id: Id;
  name: Name;
  url: Url;
  description: Description;
  tags: Id[];
}
