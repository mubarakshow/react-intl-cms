import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Lang = "en" | "fr";

function App() {
  const { t, i18n } = useTranslation();
  const [lng, setLng] = useState<Lang>("en");
  const handleClick = (lng: Lang) => {
    i18n.changeLanguage(lng);
    setLng(lng);
  };

  return (
    <div className="p-12">
      <div>
        <h2 className="text-2xl text-gray-300">Mubarak Showole</h2>
        <h3 className="text-4xl py-4 text-blue-600">
          {t("welcome", { appName: "todo" })}
        </h3>
      </div>
      <div className="space-x-4">
        <button
          className={`p-4 rounded-lg ${lng === "en" && "bg-green-100"}`}
          onClick={() => handleClick("en")}
        >
          english
        </button>
        <button
          className={`p-4 rounded-lg ${lng === "fr" && "bg-green-100"}`}
          onClick={() => handleClick("fr")}
        >
          french
        </button>
      </div>
    </div>
  );
}

export default App;
