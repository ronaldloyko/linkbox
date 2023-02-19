import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonModal,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  SelectChangeEventDetail,
  type SearchbarChangeEventDetail,
} from "@ionic/react";
import { pricetag } from "ionicons/icons";
import { useMemo, useRef, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { EMPTY_TAGS, EMPTY_TEXT } from "../../../data/constants";
import { useAction, useDispatch, useSelector } from "../../../store";
import { Id } from "../../../store/items";
import EmptyState from "./Search/EmptyState";
import Links from "./Search/Links";

export default (function Search() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.searchModalOpen);
  const links = useSelector((state) => state.items.links);
  const availableTags = useSelector((state) => state.items.tags);
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const useTags = useSelector((state) => state.ui.useTags);
  const searchBarElement = useRef<HTMLIonSearchbarElement>(null);
  const { t } = useTranslation();
  const { toggleSearchModal } = useAction();
  const [term, setTerm] = useState(EMPTY_TEXT);
  const [tags, setTags] = useState(EMPTY_TAGS as Id[]);

  const processTags = useTags && availableTags.length;
  const processedTerm = term.trim().toLowerCase();
  const filteredLinks = useMemo(() => {
    if (!processTags && !processedTerm) {
      return [];
    }

    return links.filter((link) =>
      [
        processedTerm && link.name.trim().toLowerCase().includes(processedTerm),
        processedTerm &&
          link.description.trim().toLowerCase().includes(processedTerm),
        processTags ? tags.some((tag) => link.tags.includes(tag)) : false,
      ].some((is) => is === true)
    );
  }, [links, processedTerm, tags]);

  function onTermChange({ detail }: CustomEvent<SearchbarChangeEventDetail>) {
    setTerm(detail.value ?? EMPTY_TEXT);
  }

  function onCancel() {
    dispatch(toggleSearchModal(false));
  }

  function onBeforeShow() {
    setTerm(EMPTY_TEXT);
    setTags(EMPTY_TAGS);
  }

  function onShow() {
    searchBarElement.current?.setFocus();
  }

  function onTagsChange({
    detail,
  }: CustomEvent<SelectChangeEventDetail<Id[]>>) {
    setTags(detail.value as Id[]);
  }

  return (
    <IonModal
      isOpen={open}
      onIonModalDidDismiss={onCancel}
      onIonModalWillPresent={onBeforeShow}
      onIonModalDidPresent={onShow}
    >
      <IonHeader style={{ paddingTop: statusBarHeight }}>
        <IonToolbar>
          <IonTitle>{t("overlays.modals.search.title")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>
              {t("overlays.modals.search.cancel")}
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            ref={searchBarElement}
            value={term}
            placeholder={t("overlays.modals.search.placeholder")}
            onIonChange={onTermChange}
            debounce={250}
            style={{
              "--box-shadow": 0,
            }}
          />
        </IonToolbar>
        {processTags && (
          <IonToolbar>
            <IonItem lines="none">
              <IonIcon
                slot="start"
                icon={pricetag}
                style={{
                  fontSize: "16pt",
                  marginLeft: "4px",
                  marginRight: "20px",
                }}
              />
              <IonSelect
                onIonChange={onTagsChange}
                placeholder={t("overlays.modals.search.tags.placeholder")}
                multiple={true}
                value={tags}
                cancelText={t("overlays.modals.search.tags.cancel")}
                okText={t("overlays.modals.search.tags.choose")}
                interfaceOptions={{
                  header: t("overlays.modals.search.tags.header"),
                }}
              >
                {availableTags.map(({ id, name }) => (
                  <IonSelectOption key={id} value={id}>
                    {name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonToolbar>
        )}
      </IonHeader>
      <IonContent>
        {filteredLinks.length ? (
          <Links links={filteredLinks} />
        ) : (
          <EmptyState />
        )}
      </IonContent>
    </IonModal>
  );
} as FC);
