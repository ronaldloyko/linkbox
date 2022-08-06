import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  type SelectChangeEventDetail,
} from "@ionic/react";
import "@ionic/react/css/ionic-swiper.css";
import { useEffect, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { languages } from "../../../i18n";
import { useAction, useDispatch, useSelector } from "../../../store";
import { Language } from "../../../store/ui";

const TRANSLATION_PREFIX = "overlays.modals.introduction";

export default (function Introduction() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.firstRun);
  const language = useSelector((state) => state.ui.language);
  const imageFolderPath = "/assets/introduction";
  const [swiper, setSwiper] = useState<SwiperClass>();
  const { t, i18n } = useTranslation();
  const { setLanguage, toggleFirstRun } = useAction();

  const continueText = t(`${TRANSLATION_PREFIX}.continue`);

  function switchToNextSlide() {
    swiper?.slideNext();
  }

  function close() {
    dispatch(toggleFirstRun(false));
  }

  const slides: Slide[] = [
    ...["first", "second", "third", "fourth"].map((order) => ({
      imageUrl: `${imageFolderPath}/${order}.png`,
      imageDescription: t(`${TRANSLATION_PREFIX}.${order}.imageDescription`),
      heading: t(`${TRANSLATION_PREFIX}.${order}.heading`),
      paragraph: t(`${TRANSLATION_PREFIX}.${order}.paragraph`),
      buttonEvent: switchToNextSlide,
      buttonText: continueText,
    })),
    {
      imageUrl: `${imageFolderPath}/fifth.png`,
      imageDescription: t(`${TRANSLATION_PREFIX}.fifth.imageDescription`),
      heading: t(`${TRANSLATION_PREFIX}.fifth.heading`),
      paragraph: t(`${TRANSLATION_PREFIX}.fifth.paragraph`),
      buttonEvent: close,
      buttonText: t(`${TRANSLATION_PREFIX}.start`),
    },
  ];

  const languageDirection = i18n.dir();

  function onSwiperInitialization(swiper: SwiperClass) {
    setSwiper(swiper);
  }

  function onLanguageChange(event: CustomEvent<SelectChangeEventDetail>) {
    dispatch(setLanguage(event.detail.value as Language));
  }

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.rtlTranslate = languageDirection === "rtl";
    swiper.update();
  }, [swiper, languageDirection]);

  return (
    <IonModal isOpen={open} backdropDismiss={false}>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonItem slot="start" lines="none">
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
          <IonButtons slot="end">
            <IonButton color="medium" onClick={close}>
              {t(`${TRANSLATION_PREFIX}.skip`)}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Swiper
          style={{ height: "100%" }}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSwiper={onSwiperInitialization}
        >
          {slides.map(
            (
              {
                heading,
                imageUrl,
                imageDescription,
                paragraph,
                buttonText,
                buttonEvent,
              },
              index
            ) => (
              <SwiperSlide key={index}>
                <article
                  style={{
                    padding: "0.5rem",
                  }}
                >
                  <img
                    style={{
                      width: "14rem",
                      height: "14rem",
                      objectFit: "contain",
                      pointerEvents: "none",
                    }}
                    src={imageUrl}
                    alt={imageDescription}
                  />
                  <h2
                    style={{
                      marginTop: "2rem",
                      padding: "0 1rem",
                    }}
                  >
                    {heading}
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "var(--ion-color-step-600, #60646b)",
                    }}
                  >
                    {paragraph}
                  </p>
                  <IonButton
                    size="large"
                    fill="outline"
                    style={{
                      marginTop: "1.4rem",
                    }}
                    onClick={buttonEvent}
                  >
                    {buttonText}
                  </IonButton>
                </article>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </IonContent>
    </IonModal>
  );
} as FC);

type SwiperClass = ReturnType<typeof useSwiper>;

interface Slide {
  imageUrl: string;
  imageDescription: string;
  heading: string;
  paragraph: string;
  buttonText: string;
  buttonEvent: () => void;
}
