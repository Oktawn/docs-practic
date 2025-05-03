import { readFileSync, writeFileSync } from "node:fs";
import { IDocsPlaceholder } from "../commons/interface";
import { envConfig } from "../config/app.config";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { resolve } from "node:path";

export class DocsWorksService {

  async editDoc(body: IDocsPlaceholder) {
    var path = resolve(__dirname, envConfig.get("PATH_DOCS"));
    console.log(path);
    var content = readFileSync(path + "/test_template.docx", "binary");
    var zipFile = new PizZip(content);
    var doc = new Docxtemplater(zipFile, { paragraphLoop: true, linebreaks: true });
    doc.render(body);
    var buf = doc.getZip().generate({ type: "nodebuffer", compression: "DEFLATE" });
    writeFileSync(path + "/test.docx", buf);
  }
}