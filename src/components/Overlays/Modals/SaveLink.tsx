import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
  type InputChangeEventDetail,
  type SelectChangeEventDetail,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { nanoid } from "nanoid";
import { useMemo, useRef, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_FOLDER_ID,
  EMPTY_TEXT,
  TOAST_DURATION,
  UNSELECTED_ITEM,
} from "../../../data/constants";
import useSanitizedUrl from "../../../hooks/useSanitizedUrl";
import useValidation, { Type } from "../../../hooks/useValidation";
import useValidationErrors from "../../../hooks/useValidationErrorMessage";
import { useAction, useDispatch, useSelector } from "../../../store";
import type { Id, Name, Url } from "../../../store/items";
import ErrorLine from "./ErrorLine";

export default (function SaveLink() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.saveLinkModalOpen);
  const folders = useSelector((state) => state.items.folders);
  const links = useSelector((state) => state.items.links);
  const currentFolder = useSelector((state) => state.ui.currentFolder);
  const selectedLink = useSelector((state) => state.ui.selectedLink);
  const linkBeingEdited = useMemo(
    () => links.find(({ id }) => id === selectedLink),
    [selectedLink, links]
  );
  const sanitizedUrl = useSanitizedUrl();
  const isEditing = selectedLink !== null && linkBeingEdited;
  const nameInputElement = useRef<HTMLIonInputElement>(null);
  const isValidationPassed = useValidation();
  const { t } = useTranslation();
  const { addLink, editLink, toggleSaveLinkModal, setSelectedLink } =
    useAction();
  const [name, setName] = useState(EMPTY_TEXT);
  const [url, setUrl] = useState(EMPTY_TEXT);
  const [folder, setFolder] = useState(DEFAULT_FOLDER_ID);
  const [nameErrorMessage, setNameErrorMessage, clearNameErrorMessage] =
    useValidationErrors();
  const [urlErrorMessage, setUrlErrorMessage, clearUrlErrorMessage] =
    useValidationErrors();
  const [presentToast] = useIonToast();

  function onNameChange({ detail }: CustomEvent<InputChangeEventDetail>) {
    setName(detail.value as Name);
  }

  function onUrlChange({ detail }: CustomEvent<InputChangeEventDetail>) {
    setUrl(detail.value as Url);
  }

  function onFolderChange(event: CustomEvent<SelectChangeEventDetail>) {
    setFolder(event.detail.value as Id);
  }

  function onCancel() {
    dispatch(toggleSaveLinkModal(false));
    dispatch(setSelectedLink(UNSELECTED_ITEM));
  }

  function clearErrorMessages() {
    clearNameErrorMessage();
    clearUrlErrorMessage();
  }

  function onSave() {
    const id = isEditing ? linkBeingEdited.id : nanoid();

    clearErrorMessages();

    if (
      !isValidationPassed([
        [name, setNameErrorMessage],
        [sanitizedUrl(url), setUrlErrorMessage, Type.Url],
      ])
    ) {
      return;
    }

    dispatch(
      (isEditing ? editLink : addLink)({
        id,
        name,
        url,
        folder,
      })
    );

    dispatch(toggleSaveLinkModal(false));
    dispatch(setSelectedLink(UNSELECTED_ITEM));
    presentToast({
      message: t(
        `overlays.modals.saveLink.toast.message.${
          isEditing ? "updated" : "created"
        }`,
        { name }
      ),
      duration: TOAST_DURATION,
      icon: checkmark,
    });
  }

  function onBeforeShow() {
    setName(isEditing ? linkBeingEdited.name : EMPTY_TEXT);
    setUrl(isEditing ? linkBeingEdited.url : EMPTY_TEXT);
    setFolder(isEditing ? linkBeingEdited.folder! : currentFolder);
    clearErrorMessages();
  }

  function onShow() {
    nameInputElement.current?.setFocus();
  }

  return (
    <IonModal
      isOpen={open}
      onIonModalDidDismiss={onCancel}
      onIonModalWillPresent={onBeforeShow}
      onIonModalDidPresent={onShow}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onCancel}>
              {t("overlays.modals.saveLink.cancel")}
            </IonButton>
          </IonButtons>
          <IonTitle>
            {t(
              `overlays.modals.saveLink.title.${isEditing ? "edit" : "create"}`
            )}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onSave} color="primary">
              {t(
                `overlays.modals.saveLink.save.${
                  isEditing ? "update" : "create"
                }`
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">
            {t("overlays.modals.saveLink.name.label")}
          </IonLabel>
          <IonInput
            ref={nameInputElement}
            type="text"
            placeholder={t("overlays.modals.saveLink.name.placeholder")}
            value={name}
            onIonChange={onNameChange}
            required
          />
          <ErrorLine message={nameErrorMessage} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            {t("overlays.modals.saveLink.url.label")}
          </IonLabel>
          <IonInput
            type="url"
            placeholder={t("overlays.modals.saveLink.url.placeholder")}
            inputMode="url"
            value={url}
            onIonChange={onUrlChange}
            required
          />
          <ErrorLine message={urlErrorMessage} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            {t("overlays.modals.saveLink.folder.label")}
          </IonLabel>
          <IonSelect
            interface="popover"
            value={folder}
            onIonChange={onFolderChange}
          >
            {folders.map(({ id, name }) => (
              <IonSelectOption key={id} value={id}>
                {name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonModal>
  );
} as FC);
