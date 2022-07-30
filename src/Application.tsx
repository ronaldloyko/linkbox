import { setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import type { FC } from "react";
import { Provider } from "react-redux";
import "swiper/css";
import MainPage from "./MainPage";
import store from "./store";
import "./theme.css";

setupIonicReact();

export default (function Application() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
} as FC);
