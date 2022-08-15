import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";
class Translations {
  lng: string;
  data: Record<string, string>;
  namespace?: string;
  private filePath: string;

  constructor(lng = "en", data = {}, namespace = "translation") {
    this.lng = lng;
    this.data = data;
    this.namespace = namespace;
    this.filePath = path.join(
      __dirname,
      `../../locales/${this.lng}/${this.namespace}.json`
    );
  }

  private async readJson() {
    const exists = await fs.pathExists(this.filePath);
    if (!exists) {
      fs.outputJSONSync(this.filePath, {});
      const trData = await fs.readJSON(this.filePath);
      return trData;
    }
    try {
      const trData = await fs.readJSON(this.filePath);
      return trData;
    } catch (err) {
      console.log("error reading file", err);
    }
  }

  async updateTranslation() {
    const data = await this.readJson();
    const newTrData = { ...data, ...this.data };
    try {
      fs.writeJSONSync(this.filePath, newTrData);
      console.log(`success updating ${this.namespace} translation`);
    } catch (err) {
      console.log("error updating json", err);
    }
  }
  // deleteLanguage() {}
  // deleteNamespace() {}
  // deleteNamespaceForLanguage() {}
}

export const updateTranslation = (req: Request, res: Response) => {
  const { lng, data, namespace } = req?.body;
  const tr = new Translations(lng, data, namespace);
  tr.updateTranslation()
    .then(() => {
      res.status(200).json({
        message: `Success updating ${lng} translations`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: `!! Error updating ${lng} translations !!`,
        error: err,
      });
    });
};
