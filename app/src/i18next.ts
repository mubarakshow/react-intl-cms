import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";

const resources = {
  en,
  fr,
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/{{lng}}/{{ns}}",
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
