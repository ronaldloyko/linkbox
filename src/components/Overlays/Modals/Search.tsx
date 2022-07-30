import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  type SearchbarChangeEventDetail,
} from "@ionic/react";
import { useMemo, useRef, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  BREAKPOINT_FULL_COVERED,
  BREAKPOINT_UNCOVERED,
  EMPTY_TEXT,
} from "../../../data/constants";
import { useAction, useDispatch, useSelector } from "../../../store";
import EmptyState from "./Search/EmptyState";
import Links from "./Search/Links";

export default (function Search() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.searchModalOpen);
  const links = useSelector((state) => state.items.links);
  const initialBreakpoint = BREAKPOINT_FULL_COVERED;
  const breakpoints = [BREAKPOINT_UNCOVERED, BREAKPOINT_FULL_COVERED];
  const searchBarElement = useRef<HTMLIonSearchbarElement>(null);
  const { t } = useTranslation();
  const { toggleSearchModal } = useAction();
  const [term, setTerm] = useState(EMPTY_TEXT);

  const processedTerm = term.trim().toLowerCase();
  const filteredLinks = useMemo(
    () =>
      links.filter(({ name }) =>
        name.trim().toLowerCase().includes(processedTerm)
      ),
    [links, processedTerm]
  );

  function onTermChange({ detail }: CustomEvent<SearchbarChangeEventDetail>) {
    setTerm(detail.value ?? EMPTY_TEXT);
  }

  function onCancel() {
    dispatch(toggleSearchModal(false));
  }

  function onBeforeShow() {
    setTerm(EMPTY_TEXT);
  }

  function onShow() {
    searchBarElement.current?.setFocus();
  }

  return (
    <IonModal
      isOpen={open}
      onIonModalDidDismiss={onCancel}
      onIonModalWillPresent={onBeforeShow}
      onIonModalDidPresent={onShow}
      initialBreakpoint={initialBreakpoint}
      breakpoints={breakpoints}
    >
      <IonHeader>
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
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {processedTerm.length && filteredLinks.length ? (
          <Links links={filteredLinks} />
        ) : (
          <EmptyState />
        )}
      </IonContent>
    </IonModal>
  );
} as FC);
