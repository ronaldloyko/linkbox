import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { pricetag } from "ionicons/icons";
import { useRef, type FC } from "react";
import { useTranslation } from "react-i18next";
import { EMPTY_TEXT } from "../../../../data/constants";
import useOnPress from "../../../../hooks/useOnPress";
import { useAction, useDispatch } from "../../../../store";
import { Id, Name } from "../../../../store/items";

export default (function Tag({ id, name, count }) {
  const dispatch = useDispatch();
  const element = useRef<HTMLIonItemElement>(null!);
  const { t } = useTranslation();
  const {
    setSelectedTag,
    toggleTagActionSheet,
    toggleSearchModal,
    toggleTagsModal,
    prefillSearchFilters,
  } = useAction();

  useOnPress(element, () => {
    Haptics.impact({ style: ImpactStyle.Medium });
    dispatch(setSelectedTag(id));
    dispatch(toggleTagActionSheet(true));
  });

  function onClick() {
    dispatch(
      prefillSearchFilters({
        tags: [id],
        term: EMPTY_TEXT,
      })
    );
    dispatch(toggleSearchModal(true));
    dispatch(toggleTagsModal(false));
  }

  return (
    <IonItem button onClick={onClick} ref={element}>
      <IonIcon slot="start" icon={pricetag} />
      <IonLabel>{name}</IonLabel>
      <IonLabel slot="end">
        <p>{t("overlays.modals.tags.link", { count })}</p>
      </IonLabel>
    </IonItem>
  );
} as FC<Properties>);

interface Properties {
  id: Id;
  name: Name;
  count: number;
}
