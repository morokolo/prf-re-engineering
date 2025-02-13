import { exec } from "child_process";
import path from "path";
import fs from "fs";

export function convertPdfToHtml(pdfPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(__dirname, "../public");
    const filename = path.basename(pdfPath, ".pdf");
    const command = `pdf2htmlEX --dest-dir ${outputDir} --zoom 1.3 ${pdfPath}`;

    exec(command, (error) => {
      if (error) {
        return reject("Failed to convert PDF");
      }

      const htmlFile = path.join(outputDir, `${filename}.html`);
      if (!fs.existsSync(htmlFile)) {
        return reject("HTML file not found after conversion");
      }

      resolve(`http://localhost:3000/public/${filename}.html`);
    });
  });
}
