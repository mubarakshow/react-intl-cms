import fs from "fs";
import express from "express";
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import cors from "cors";
import path from "path";
import { updateTranslation } from "./controllers/translation";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/locales", express.static(path.join(__dirname, "../locales")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to translation/copy management backend" });
});

app.put("/update-tr", updateTranslation);

app.listen(PORT, () => {
  console.log(`Translations server listening on port ${PORT}`);
});

i18next.use(HttpBackend).init(
  {
    lng: "en",
    fallbackLng: "en",
    preload: ["en", "fr"],
    ns: ["translation", "cur8"],
    defaultNS: "translation",
    backend: {
      withCredentials: false,
      crossDomain: true,
      loadPath: "http://localhost:8080/locales/{{lng}}/{{ns}}.json",
      requestOptions: {
        // used for fetch, can also be a function (payload) => ({ method: 'GET' })
        mode: "cors",
        credentials: "same-origin",
        cache: "default",
      },
    },
  },
  (err, t) => {
    if (err) console.log("Error loading translations...", err);
    createCur8Translations();
    console.log("i18next is ready...");
    console.log(t("welcome", { appName: "translation sever" }));
    console.log(t("welcome", { appName: "translation sever", lng: "fr" }));
    console.log(t("cur8_app", { ns: "cur8" }));
    console.log(t("cur8_app", { ns: "cur8", lng: "fr" }));
  }
);

const createCur8Translations = () => {
  const enPath = "./locales/en/cur8.json";
  const frPath = "./locales/fr/cur8.json";
  const enCur8 = {
    cur8_app: "Cur8 is your one stop halal investment platform",
  };
  const frCur8 = {
    cur8_app: "Cur8 est votre plateforme d'investissement halal unique",
  };
  try {
    fs.writeFileSync(enPath, JSON.stringify(enCur8, null, 2), "utf-8");
    console.log("en:Successfully created cur8 namespace");
  } catch (error) {
    console.log("en:fs error", error);
  }
  try {
    fs.writeFileSync(frPath, JSON.stringify(frCur8, null, 2), "utf-8");
    console.log("fr:Successfully created cur8 namespace");
  } catch (error) {
    console.log("en:fs error", error);
  }
};
