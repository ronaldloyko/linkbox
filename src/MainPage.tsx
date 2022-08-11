import { WebIntent, type Intent } from "@awesome-cordova-plugins/web-intent";
import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonApp, IonPage, type BackButtonEvent } from "@ionic/react";
import { SafeArea } from "capacitor-plugin-safe-area";
import { useEffect, useState, type FC } from "react";
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
  const { prefillName, prefillUrl, toggleSaveLinkModal, setStatusBarHeight } =
    useAction();
  const { i18n } = useTranslation();
  const [appliedTheme, setAppliedTheme] = useState<Theme>();

  useEffect(() => {
    dispatch(loadDataFromStorage());
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.dir = i18n.dir();
  }, [i18n, language]);

  useEffect(() => {
    if (theme !== Theme.System) {
      applyTheme(theme === Theme.Dark);
      return;
    }

    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(preferDark: boolean) {
      setAppliedTheme(preferDark ? Theme.Dark : Theme.Light);
    }

    function onChange({ matches }: MediaQueryListEvent) {
      applyTheme(matches);
    }

    applyTheme(prefersDarkTheme.matches);

    prefersDarkTheme.addEventListener(EVENT_NAME_CHANGE, onChange);

    return () => {
      prefersDarkTheme.removeEventListener(EVENT_NAME_CHANGE, onChange);
    };
  }, [theme]);

  useEffect(() => {
    if (!appliedTheme) {
      return;
    }

    function toggle(appliedThemeClass: Theme, active: boolean) {
      StatusBar.setStyle({
        style: appliedTheme!.toUpperCase() as Style,
      });
      document.body.classList.toggle(appliedThemeClass, active);
    }

    for (const availableTheme of Object.values(Theme)) {
      toggle(availableTheme, false);
    }

    toggle(appliedTheme, true);
  }, [theme, appliedTheme]);

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

  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: true });

    (async () => {
      const { insets } = await SafeArea.getSafeAreaInsets();
      dispatch(setStatusBarHeight(insets.top.toFixed() + "px"));
    })();
  }, [setStatusBarHeight, dispatch]);

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
