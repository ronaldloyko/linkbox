import { App } from "@capacitor/app";
import { IonApp, IonPage, type BackButtonEvent } from "@ionic/react";
import { useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import Content from "./components/Content";
import Header from "./components/Header";
import Overlays from "./components/Overlays";
import { EVENT_NAME_BACK_BUTTON, EVENT_NAME_CHANGE } from "./data/constants";
import { useDispatch, useSelector } from "./store";
import { loadDataFromStorage } from "./store/thunks";
import { Theme } from "./store/ui";

export default (function MainPage() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.ui.language);
  const theme = useSelector((state) => state.ui.theme);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(loadDataFromStorage());
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.dir = i18n.dir();
  }, [i18n, language]);

  useEffect(() => {
    function toggle(themeClass: Theme, isActive: boolean) {
      document.body.classList.toggle(themeClass, isActive);
    }

    for (const availableTheme of Object.values(Theme)) {
      toggle(availableTheme, false);
    }

    if (theme !== Theme.System) {
      toggle(theme, true);
      return;
    }

    const isPreferringDark = window.matchMedia("(prefers-color-scheme: dark)");

    function onChange({ matches }: MediaQueryListEvent) {
      toggle(Theme.Dark, matches);
    }

    toggle(Theme.Dark, isPreferringDark.matches);

    isPreferringDark.addEventListener(EVENT_NAME_CHANGE, onChange);

    return () => {
      isPreferringDark.removeEventListener(EVENT_NAME_CHANGE, onChange);
    };
  }, [theme]);

  useEffect(() => {
    function onBackButton(event: BackButtonEvent) {
      event.detail.register(-1, () => {
        App.exitApp();
      });
    }

    document.addEventListener<any>(EVENT_NAME_BACK_BUTTON, onBackButton);

    return () => {
      document.removeEventListener<any>(EVENT_NAME_BACK_BUTTON, onBackButton);
    };
  }, []);

  return (
    <IonApp>
      <IonPage>
        <Overlays />
        <Header />
        <Content />
      </IonPage>
    </IonApp>
  );
} as FC);
