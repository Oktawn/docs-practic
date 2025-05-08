import { promises } from "node:fs";
import { envConfig } from "../config/env.config";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { resolve } from "node:path";
import { DocsInVUZType, DocsWithoutVUZType } from "../commons/types/types";
import { CommonEnum, DocumentsNameEnum, DocumentsNameWithoutVUZEnum } from "../commons/enums/documents.enum";

export class DocsWorksService {

  private path = resolve(__dirname, envConfig.get("PATH_DOCS"));;

  getShortNameStudent(fullName: string) {
    const nameParts = fullName.split(" ");
    if (nameParts.length < 3) {
      throw new Error("Invalid full name format");
    }
    const lastName = nameParts[0];
    const firstName = nameParts[1].charAt(0).toUpperCase() + ".";
    const middleName = nameParts[2].charAt(0).toUpperCase() + ".";
    return `${lastName} ${firstName}${middleName}`;
  }
  getShortNameDirector(fullName: string) {
    const nameParts = fullName.split(" ");
    if (nameParts.length < 3) {
      throw new Error("Invalid full name format");
    }
    const lastName = nameParts[0];
    const firstName = nameParts[1].charAt(0).toUpperCase() + ".";
    const middleName = nameParts[2].charAt(0).toUpperCase() + ".";
    return `${firstName}${middleName} ${lastName} `;
  }


  async getDocumentsInVUZ(body: DocsInVUZType) {
    body.shortFullName = this.getShortNameStudent(body.fullName);

    const templateFiles: string[] = [];
    if (body.groups.toLowerCase().includes("эбп")) {
      templateFiles.push(CommonEnum.IZ_BP);
    } else {
      templateFiles.push(CommonEnum.IZ);
    }
    Object.entries(DocumentsNameEnum).forEach(([_, value]) => {
      templateFiles.push(value);
    });

    try {
      const res = await Promise.all(templateFiles.map(file => this.processFile(file, body)));
      return res;
    } catch (error) {
      console.error("Error processing file:", error);
      throw error;
    }
  }

  async getDocumentsWithoutVUZ(body: DocsWithoutVUZType) {
    body.shortFullName = this.getShortNameStudent(body.fullName);
    body.shortDirector = this.getShortNameDirector(body.directorFullName);

    const templateFiles: string[] = [];
    if (body.groups.toLowerCase().includes("эбп")) {
      templateFiles.push(CommonEnum.IZ_BP);
    } else {
      templateFiles.push(CommonEnum.IZ);
    }
    Object.entries(DocumentsNameWithoutVUZEnum).forEach(([_, value]) => {
      templateFiles.push(value);
    });

    try {
      const res = await Promise.all(templateFiles.map(file => this.processFile(file, body)));
      return res;
    } catch (error) {
      console.error("Error processing file:", error);
      throw error;
    }
  }

  private async processFile(file: string, body: any) {
    const filePath = `${this.path}/${file}`;
    const content = await promises.readFile(filePath, "binary");
    const zipFile = new PizZip(content);
    const doc = new Docxtemplater(zipFile, {
      paragraphLoop: true,
      linebreaks: true
    });
    doc.render(body);
    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE"
    });
    const fileName = `${file}_${body.shortFullName}`;

    await promises.writeFile(`${this.path}/output-files/${fileName}.docx`, buf);
  }
}
