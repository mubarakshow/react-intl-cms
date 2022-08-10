import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // resources,
    lng: "en",
    ns: ["translation", "cur8"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      crossDomain: true,
      loadPath: "http://localhost:8080/locales/{{lng}}/{{ns}}.json",
      addPath: "http://localhost:8080/locales/{{lng}}/{{ns}}.json",
      allowMultiLoading: false,
      requestOptions: {
        // used for fetch, can also be a function (payload) => ({ method: 'GET' })
        mode: "cors",
        credentials: "same-origin",
        cache: "default",
      },
    },
  });

export default i18next;
