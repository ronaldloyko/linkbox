import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE } from "./data/constants";

import german from "./locales/de.json";
import english from "./locales/en.json";

const usedLanguages = [english, german];

export const languages = usedLanguages.map((language) => ({
  code: language.translation.meta.code,
  name: language.translation.meta.name,
  translation: language,
}));

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  resources: Object.fromEntries(
    languages.map(({ code, translation }) => [code, translation])
  ),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
