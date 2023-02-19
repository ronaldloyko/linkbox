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
import useValidationErrorMessage from "../../../hooks/useValidationErrorMessage";
import { useAction, useDispatch, useSelector } from "../../../store";
import { Name } from "../../../store/items";
import ErrorLine from "./ErrorLine";

export default (function SaveTag() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.saveTagModalOpen);
  const tags = useSelector((state) => state.items.tags);
  const selectedTag = useSelector((state) => state.ui.selectedTag);
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const tagBeingEdited = useMemo(
    () => tags.find(({ id }) => id === selectedTag),
    [selectedTag, tags]
  );
  const isEditing = selectedTag !== UNSELECTED_ITEM && tagBeingEdited;
  const modalElement = useRef<HTMLIonModalElement>(null);
  const nameInputElement = useRef<HTMLIonInputElement>(null);
  const isValidationPassed = useValidation();
  const { t } = useTranslation();
  const { addTag, editTag, setSelectedTag, toggleSaveTagModal } = useAction();
  const [name, setName] = useState(EMPTY_TEXT);
  const [nameErrorMessage, setNameErrorMessage, clearNameErrorMessage] =
    useValidationErrorMessage();
  const [presentToast] = useIonToast();

  function onNameChange({ detail }: CustomEvent<InputChangeEventDetail>) {
    setName(detail.value as Name);
  }

  function onCancel() {
    dispatch(toggleSaveTagModal(false));
    dispatch(setSelectedTag(UNSELECTED_ITEM));
  }

  function onClose() {
    modalElement.current?.dismiss();
  }

  function onSave() {
    const id = isEditing ? tagBeingEdited.id : nanoid();

    clearNameErrorMessage();

    if (!isValidationPassed([[name, setNameErrorMessage]])) {
      return;
    }

    dispatch((isEditing ? editTag : addTag)({ id, name }));
    dispatch(toggleSaveTagModal(false));
    presentToast({
      message: t(
        `overlays.modals.saveTag.toast.message.${
          isEditing ? "updated" : "created"
        }`,
        { name }
      ),
      duration: TOAST_DURATION,
      icon: checkmark,
    });
  }

  function onBeforeShow() {
    setName(isEditing ? tagBeingEdited.name : EMPTY_TEXT);
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
      ref={modalElement}
    >
      <IonHeader style={{ paddingTop: statusBarHeight }}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              {t("overlays.modals.saveTag.cancel")}
            </IonButton>
          </IonButtons>
          <IonTitle>
            {t(
              `overlays.modals.saveTag.title.${isEditing ? "edit" : "create"}`
            )}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onSave} color="primary">
              {t(
                `overlays.modals.saveTag.save.${
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
            {t("overlays.modals.saveTag.name.label")}
          </IonLabel>
          <IonInput
            ref={nameInputElement}
            type="text"
            placeholder={t("overlays.modals.saveTag.name.placeholder")}
            value={name}
            onIonChange={onNameChange}
            required
          />
          <ErrorLine message={nameErrorMessage} />
        </IonItem>
      </IonContent>
    </IonModal>
  );
} as FC);
