import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonToast,
  type InputChangeEventDetail,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { nanoid } from "nanoid";
import { useMemo, useRef, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  EMPTY_TEXT,
  TOAST_DURATION,
  UNSELECTED_ITEM,
} from "../../../data/constants";
import useValidation from "../../../hooks/useValidation";
import useValidationErrors from "../../../hooks/useValidationErrorMessage";
import { useAction, useDispatch, useSelector } from "../../../store";
import type { Name } from "../../../store/items";
import ErrorLine from "./ErrorLine";

export default (function SaveFolder() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.saveFolderModalOpen);
  const folders = useSelector((state) => state.items.folders);
  const selectedFolder = useSelector((state) => state.ui.selectedFolder);
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const folderBeingEdited = useMemo(
    () => folders.find(({ id }) => id === selectedFolder),
    [selectedFolder, folders]
  );
  const isEditingFolder = selectedFolder !== null && folderBeingEdited;
  const nameInputElement = useRef<HTMLIonInputElement>(null);
  const isValidationPassed = useValidation();
  const { t } = useTranslation();
  const { addFolder, editFolder, toggleSaveFolderModal, setSelectedFolder } =
    useAction();
  const [name, setName] = useState(EMPTY_TEXT);
  const [nameErrorMessage, setNameErrorMessage, clearNameErrorMessage] =
    useValidationErrors();
  const [presentToast] = useIonToast();

  function onNameChange({ detail }: CustomEvent<InputChangeEventDetail>) {
    setName(detail.value as Name);
  }

  function onCancel() {
    dispatch(toggleSaveFolderModal(false));
    dispatch(setSelectedFolder(UNSELECTED_ITEM));
  }

  function onSave() {
    const id = isEditingFolder ? folderBeingEdited.id : nanoid();

    clearNameErrorMessage();

    if (!isValidationPassed([[name, setNameErrorMessage]])) {
      return;
    }

    dispatch((isEditingFolder ? editFolder : addFolder)({ id, name }));
    dispatch(toggleSaveFolderModal(false));
    dispatch(setSelectedFolder(UNSELECTED_ITEM));
    presentToast({
      message: t(
        `overlays.modals.saveFolder.toast.message.${
          isEditingFolder ? "updated" : "created"
        }`,
        { name }
      ),
      duration: TOAST_DURATION,
      icon: checkmark,
    });
  }

  function onBeforeShow() {
    setName(isEditingFolder ? folderBeingEdited.name : EMPTY_TEXT);
    clearNameErrorMessage();
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
      <IonHeader style={{ paddingTop: statusBarHeight }}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onCancel}>
              {t("overlays.modals.saveFolder.cancel")}
            </IonButton>
          </IonButtons>
          <IonTitle>
            {t(
              `overlays.modals.saveFolder.title.${
                isEditingFolder ? "edit" : "create"
              }`
            )}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onSave} color="primary">
              {t(
                `overlays.modals.saveFolder.save.${
                  isEditingFolder ? "update" : "create"
                }`
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">
            {t("overlays.modals.saveFolder.name.label")}
          </IonLabel>
          <IonInput
            ref={nameInputElement}
            type="text"
            placeholder={t("overlays.modals.saveFolder.name.placeholder")}
            value={name}
            onIonChange={onNameChange}
          />
          <ErrorLine message={nameErrorMessage} />
        </IonItem>
      </IonContent>
    </IonModal>
  );
} as FC);
