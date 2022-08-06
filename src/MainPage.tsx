import { App } from "@capacitor/app";
import { IonApp, IonPage, type BackButtonEvent } from "@ionic/react";
import { WebIntent, type Intent } from "@awesome-cordova-plugins/web-intent";
import { useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import Content from "./components/Content";
import Header from "./components/Header";
import Overlays from "./components/Overlays";
import {
  EVENT_NAME_BACK_BUTTON,
  EVENT_NAME_CHANGE,
  SHARING_MIME_TYPE,
} from "./data/constants";
import { useAction, useDispatch, useSelector } from "./store";
import { loadDataFromStorage } from "./store/thunks";
import { Theme } from "./store/ui";

export default (function MainPage() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.ui.language);
  const theme = useSelector((state) => state.ui.theme);
  const { prefillName, prefillUrl, toggleSaveLinkModal } = useAction();
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

  useEffect(() => {
    const intentSubscription = WebIntent.onIntent().subscribe(handleIntent);

    function handleIntent(intent: Intent) {
      if (
        intent.action !== WebIntent.ACTION_SEND ||
        intent.type !== SHARING_MIME_TYPE
      ) {
        return;
      }

      const { [WebIntent.EXTRA_SUBJECT]: name, [WebIntent.EXTRA_TEXT]: url } =
        intent.extras as { [key: string]: string };

      dispatch(prefillName(name));
      dispatch(prefillUrl(url));
      dispatch(toggleSaveLinkModal(true));
    }

    return () => {
      intentSubscription.unsubscribe();
    };
  }, [dispatch, prefillName, prefillUrl, toggleSaveLinkModal]);

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
