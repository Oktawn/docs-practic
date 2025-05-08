import { Router } from "express";
import { DocsWorksService } from "./docsWorks.service";
import path from "node:path";
import { unlink } from "node:fs";
import archiver from "archiver";

const docsRouter = Router();
const docsService = new DocsWorksService();

docsRouter.post("/docs", async (req, res) => {
  try {
    let filePaths: string[];

    if (req.body.isVUZ === false || req.body.directorFullName) {
      filePaths = await docsService.getDocumentsWithoutVUZ(req.body);
    } else {
      filePaths = await docsService.getDocumentsInVUZ(req.body);
    }

    const baseFileName = req.body.fullName
      ? `docs_${Date.now()}`
      : `docs_${Date.now()}`;

    const zipFileName = `${baseFileName}.zip`;


    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);


    const archive = archiver('zip', {
      zlib: { level: 9 }
    });


    archive.pipe(res);


    filePaths.forEach(filePath => {
      const fileName = path.basename(filePath);
      archive.file(filePath, { name: fileName });
    });


    await archive.finalize();


    setTimeout(() => {
      filePaths.forEach(filePath => {
        unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete file ${filePath}:`, err);
        });
      });
    }, 1000);

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { docsRouter };