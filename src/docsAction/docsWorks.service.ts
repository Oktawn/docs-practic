import { readFileSync, writeFileSync } from "node:fs";
import { envConfig } from "../config/env.config";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { DocsIZType } from "../commons/types/types";
import { DocumentsNameEnum } from "../commons/enums/documents.enum";
import { PracticsStyleEnum, PracticsTypeEnum } from "../commons/enums/practics.enum";

export class DocsWorksService {

  async editDoc(body: DocsIZType) {
    var path = resolve(__dirname, envConfig.get("PATH_DOCS"));
    console.log(path);
    var fileName = "";
    if (body.isVUZ) {
      fileName = DocumentsNameEnum.INSTRUCTASH_VUZ;
    } else {
      fileName = DocumentsNameEnum.INSTRUCTASH;
    }
    var content = readFileSync(path + `/${fileName}`, "binary");
    var zipFile = new PizZip(content);
    var doc = new Docxtemplater(zipFile, { paragraphLoop: true, linebreaks: true });
    doc.render(body);
    var buf = doc.getZip().generate({ type: "nodebuffer", compression: "DEFLATE" });
    var fileName = randomBytes(20).toString("hex");
    writeFileSync(path + `/${fileName}.docx`, buf);
  }
}

const test = new DocsWorksService();
test.editDoc({
  fullName: "Белых Дмитрий",
  profile: "",
  specialization: "",
  groups: "",
  practicStyle: PracticsStyleEnum.PR,
  practicType: PracticsTypeEnum.TECH,
  dateStart: "",
  dateEnd: "",
  universityMentor: "",
  orgPracticeLeader: "",
  uniDivisionManager: "",
  isVUZ: false
})