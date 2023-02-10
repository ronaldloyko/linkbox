import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useAction, useDispatch, useSelector } from "../../../store";
import EmptyState from "./Tags/EmptyState";
import FloatingButton from "./Tags/FloatingButton";
import Tag from "./Tags/Tag";

export default (function Tags() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.tagsModalOpen);
  const links = useSelector((state) => state.items.links);
  const tags = useSelector((state) => state.items.tags);
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const { t } = useTranslation();
  const { toggleTagsModal } = useAction();

  const linksPerTags = useMemo(
    () =>
      links.reduce((counter, { tags }) => {
        for (const tag of tags) {
          counter[tag] ??= 0;
          counter[tag]++;
        }

        return counter;
      }, {} as { [key: string]: number }) as { [key: string]: number },
    [links]
  );

  function onCancel() {
    dispatch(toggleTagsModal(false));
  }

  return (
    <IonModal isOpen={open} onIonModalDidDismiss={onCancel}>
      <IonHeader style={{ paddingTop: statusBarHeight }}>
        <IonToolbar>
          <IonTitle>{t("overlays.modals.tags.title")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>
              {t("overlays.modals.tags.close")}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FloatingButton />
        {tags.length ? (
          <IonList lines="none">
            {tags.map(({ id, name }) => (
              <Tag key={id} id={id} name={name} count={linksPerTags[id]} />
            ))}
          </IonList>
        ) : (
          <EmptyState />
        )}
      </IonContent>
    </IonModal>
  );
} as FC);
