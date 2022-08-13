import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE } from "./data/constants";

import german from "./locales/de.json";
import english from "./locales/en.json";
import arabic from "./locales/ar.json";
import spanish from "./locales/es.json";
import norwegianBokmal from "./locales/nb_NO.json";
import brazilianPortuguese from "./locales/pt_BR.json";
import ukrainian from "./locales/uk.json";
import simplifiedChinese from "./locales/zh_Hans.json";
import french from "./locales/fr.json";
import turkish from "./locales/tr.json";

const usedLanguages = [
  english,
  german,
  arabic,
  spanish,
  norwegianBokmal,
  brazilianPortuguese,
  ukrainian,
  simplifiedChinese,
  french,
  turkish,
];

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
