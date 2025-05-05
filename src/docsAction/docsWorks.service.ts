import { promises } from "node:fs";
import { envConfig } from "../config/env.config";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { DocsIZType } from "../commons/types/types";
import { DocumentsNameEnum } from "../commons/enums/documents.enum";
import { PracticsTypeEnum } from "../commons/enums/practics.enum";

export class DocsWorksService {

  async getShortName(fullName: string) {
    const nameParts = fullName.split(" ");
    if (nameParts.length < 3) {
      throw new Error("Invalid full name format");
    }
    const lastName = nameParts[0];
    const firstName = nameParts[1].charAt(0).toUpperCase() + ".";
    const middleName = nameParts[2].charAt(0).toUpperCase() + ".";
    return `${lastName} ${firstName}${middleName}`;
  }


  async editDoc(body: DocsIZType) {
    var path = resolve(__dirname, envConfig.get("PATH_DOCS"));
    body.shortFullName = await this.getShortName(body.fullName);

    var templateFiles: DocumentsNameEnum[] = [];
    if (body.practicType === PracticsTypeEnum.TECH) {
      if (body.isVUZ) {
        Object.entries(DocumentsNameEnum).forEach(([key, value]) => {
          if (key.includes("VUZ")) {
            templateFiles.push(value);
          }
        });
      } else {
        Object.entries(DocumentsNameEnum).forEach(([key, value]) => {
          if (!key.includes("VUZ")) {
            templateFiles.push(value);
          }
        });
      }
    }
    const processFile = async (file: DocumentsNameEnum) => {
      const filePath = `${path}/${file}`;
      const content = await promises.readFile(filePath, "binary");
      const zipFile = new PizZip(content);
      const doc = new Docxtemplater(zipFile, {
        paragraphLoop: true,
        linebreaks: true
      });
      doc.render(body);
      var buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE"
      });
      var fileName = randomBytes(10).toString("hex");

      await promises.writeFile(`${path}/output-files/${fileName}.docx`, buf);
    }
    try {
      const res = await Promise.all(templateFiles.map(file => processFile(file)));
      return res;
    } catch (error) {
      console.error("Error processing file:", error);
      throw error;
    }
  }
}

