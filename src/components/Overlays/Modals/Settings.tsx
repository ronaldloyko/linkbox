import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  type CheckboxChangeEventDetail,
  type SelectChangeEventDetail,
} from "@ionic/react";
import {
  cloudDownload,
  cloudUpload,
  code,
  contrast,
  pricetag,
  image,
  text,
  language as languageIcon,
  swapVertical,
} from "ionicons/icons";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FC,
  type MouseEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { Haptics, NotificationType } from "@capacitor/haptics";
import {
  APPLICATION_NAME,
  BACKUP_MIME_TYPE,
  EMPTY_TEXT,
  URL_SOURCE_CODE,
  URL_TARGET,
  VERSION,
} from "../../../data/constants";
import storage, { StorageError } from "../../../data/storage";
import { languages } from "../../../i18n";
import { useAction, useDispatch, useSelector } from "../../../store";
import { loadDataFromStorage } from "../../../store/thunks";
import {
  AvatarVisibility,
  DescriptionVisibility,
  LinkSorting,
  TagsUsageFlag,
  Theme,
  type Language,
} from "../../../store/ui";

const TRANSLATION_PREFIX = "overlays.modals.settings";

export default (function Settings() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.settingsModalOpen);
  const linkSorting = useSelector((state) => state.ui.linkSorting);
  const language = useSelector((state) => state.ui.language);
  const theme = useSelector((state) => state.ui.theme);
  const showAvatar = useSelector((state) => state.ui.showAvatar);
  const showDescription = useSelector((state) => state.ui.showDescription);
  const useTags = useSelector((state) => state.ui.useTags);
  const statusBarHeight = useSelector((state) => state.ui.statusBarHeight);
  const { t } = useTranslation();
  const {
    toggleSettingsModal,
    toggleShowAvatar,
    toggleShowDescription,
    toggleUseTags,
    setLinkSorting,
    setLanguage,
    setTheme,
  } = useAction();
  const [presentAlert] = useIonAlert();
  const fileSelector = useRef<HTMLInputElement | null>(null);

  // XXX: Workaround since select element texts are not updated after changing the language.
  const [showOptions, setShowOptions] = useState(true);

  function onCancel() {
    dispatch(toggleSettingsModal(false));
  }

  function onThemeChange(event: CustomEvent<SelectChangeEventDetail>) {
    dispatch(setTheme(event.detail.value as Theme));
  }

  function onLanguageChange(event: CustomEvent<SelectChangeEventDetail>) {
    dispatch(setLanguage(event.detail.value as Language));

    // XXX: See statement above showOptions definition.
    setShowOptions(false);
    setShowOptions(true);
  }

  function onLinkSortingChange(event: CustomEvent<SelectChangeEventDetail>) {
    dispatch(setLinkSorting(event.detail.value as LinkSorting));
  }

  function onShowAvatarChange(event: CustomEvent<CheckboxChangeEventDetail>) {
    dispatch(toggleShowAvatar(event.detail.checked as AvatarVisibility));
  }

  function onShowDescriptionChange(
    event: CustomEvent<CheckboxChangeEventDetail>
  ) {
    dispatch(
      toggleShowDescription(event.detail.checked as DescriptionVisibility)
    );
  }

  function onUseTagsChange(
    event: CustomEvent<CheckboxChangeEventDetail>
  ) {
    dispatch(
      toggleUseTags(event.detail.checked as TagsUsageFlag)
    );
  }

  function onImportClick() {
    Haptics.notification({ type: NotificationType.Warning });

    presentAlert({
      message: t(`${TRANSLATION_PREFIX}.data.import.confirmationAlert.message`),
      buttons: [
        {
          text: t(`${TRANSLATION_PREFIX}.data.import.confirmationAlert.abort`),
          role: "cancel",
        },
        {
          text: t(
            `${TRANSLATION_PREFIX}.data.import.confirmationAlert.proceed`
          ),
          role: "confirm",
          handler() {
            fileSelector.current?.click();
          },
        },
      ],
    });
  }

  async function onExportClick() {
    const path = (await storage.export()).split("/").at(-1);

    Haptics.notification({ type: NotificationType.Success });

    presentAlert({
      message: t(`${TRANSLATION_PREFIX}.data.export.alert.message`, {
        path,
      }),
      buttons: [t(`${TRANSLATION_PREFIX}.data.export.alert.close`)],
    });
  }

  async function onFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    let message: string = EMPTY_TEXT;
    let hapticFeedbackType: NotificationType = NotificationType.Success;

    try {
      if (!file || file.type !== BACKUP_MIME_TYPE) {
        throw new Error(StorageError.InvalidFile);
      }

      try {
        await storage.import(window.JSON.parse(await file.text()));

        message = t(
          `${TRANSLATION_PREFIX}.data.import.finalAlert.message.successful`
        );
      } catch {
        throw new Error(StorageError.InvalidContent);
      }
    } catch (error) {
      hapticFeedbackType = NotificationType.Error;
      message = t(
        `${TRANSLATION_PREFIX}.data.import.finalAlert.message.unknownError`
      );

      if (!(error instanceof Error)) {
        return;
      }

      switch (error.message) {
        case StorageError.InvalidFile:
        case StorageError.InvalidContent:
          hapticFeedbackType = NotificationType.Error;
          message = t(
            `${TRANSLATION_PREFIX}.data.import.finalAlert.message.${error.message}`
          );
          break;
      }
    } finally {
      event.target.value = "";

      Haptics.notification({ type: hapticFeedbackType });

      presentAlert({
        message,
        buttons: [t(`${TRANSLATION_PREFIX}.data.import.finalAlert.close`)],
      });

      await dispatch(loadDataFromStorage());
    }
  }

  function onFileSelectorClick(event: MouseEvent) {
    event.stopPropagation();
  }

  function onSourceCodeClick() {
    window.open(URL_SOURCE_CODE, URL_TARGET);
  }

  return (
    <IonModal isOpen={open} onIonModalDidDismiss={onCancel}>
      <IonHeader style={{ paddingTop: statusBarHeight }}>
        <IonToolbar>
          <IonTitle>{t(`${TRANSLATION_PREFIX}.title`)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>
              {t(`${TRANSLATION_PREFIX}.close`)}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="none">
          <IonListHeader>
            <IonLabel color="medium">
              {t(`${TRANSLATION_PREFIX}.interface.label`)}
            </IonLabel>
          </IonListHeader>
          {showOptions && (
            <>
              <IonItem>
                <IonIcon slot="start" icon={languageIcon} />
                <IonLabel position="stacked">
                  {t(`${TRANSLATION_PREFIX}.interface.language`)}
                </IonLabel>
                <IonSelect
                  interface="popover"
                  value={language}
                  onIonChange={onLanguageChange}
                >
                  {languages.map(({ code, name }) => (
                    <IonSelectOption key={code} value={code}>
                      {name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={contrast} />
                <IonLabel position="stacked">
                  {t(`${TRANSLATION_PREFIX}.interface.theme.label`)}
                </IonLabel>
                <IonSelect
                  interface="popover"
                  value={theme}
                  onIonChange={onThemeChange}
                >
                  {Object.values(Theme).map((value) => (
                    <IonSelectOption key={value} value={value}>
                      {t(`${TRANSLATION_PREFIX}.interface.theme.${value}`)}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={swapVertical} />
                <IonLabel position="stacked">
                  {t(`${TRANSLATION_PREFIX}.interface.linkSorting.label`)}
                </IonLabel>
                <IonSelect
                  interface="popover"
                  value={linkSorting}
                  onIonChange={onLinkSortingChange}
                >
                  {Object.values(LinkSorting).map((value) => (
                    <IonSelectOption key={value} value={value}>
                      {t(
                        `${TRANSLATION_PREFIX}.interface.linkSorting.${value}`
                      )}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </>
          )}
          <IonItem>
            <IonIcon slot="start" icon={image} />
            <IonLabel>
              {t(`${TRANSLATION_PREFIX}.interface.showAvatar`)}
            </IonLabel>
            <IonCheckbox
              slot="end"
              checked={showAvatar}
              onIonChange={onShowAvatarChange}
            />
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={text} />
            <IonLabel>
              {t(`${TRANSLATION_PREFIX}.interface.showDescription`)}
            </IonLabel>
            <IonCheckbox
              slot="end"
              checked={showDescription}
              onIonChange={onShowDescriptionChange}
            />
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={pricetag} />
            <IonLabel>
              {t(`${TRANSLATION_PREFIX}.interface.useTags`)}
            </IonLabel>
            <IonCheckbox
              slot="end"
              checked={useTags}
              onIonChange={onUseTagsChange}
            />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>
            <IonLabel color="medium">
              {t(`${TRANSLATION_PREFIX}.data.label`)}
            </IonLabel>
          </IonListHeader>
          <IonItem button onClick={onImportClick}>
            <IonIcon slot="start" icon={cloudDownload} />
            <IonLabel>{t(`${TRANSLATION_PREFIX}.data.import.label`)}</IonLabel>
            <input
              type="file"
              ref={fileSelector}
              style={{ display: "none" }}
              onChange={onFileSelection}
              onClick={onFileSelectorClick}
              accept={BACKUP_MIME_TYPE}
            />
          </IonItem>
          <IonItem button onClick={onExportClick}>
            <IonIcon slot="start" icon={cloudUpload} />
            <IonLabel>{t(`${TRANSLATION_PREFIX}.data.export.label`)}</IonLabel>
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>
            <IonLabel color="medium">
              {t(`${TRANSLATION_PREFIX}.miscellaneous.label`)}
            </IonLabel>
          </IonListHeader>
          <IonItem button onClick={onSourceCodeClick}>
            <IonIcon icon={code} slot="start" />
            <IonLabel>
              {t(`${TRANSLATION_PREFIX}.miscellaneous.sourceCode`)}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonText color="medium">
              <small>
                {APPLICATION_NAME} {VERSION}
              </small>
            </IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
} as FC);
