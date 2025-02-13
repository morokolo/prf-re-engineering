import express, { Request, Response } from "express";
import multer from "multer";
import { exec } from "child_process";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Ensure the "uploads" folder exists

router.post(
  "/convert",
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    try {
      const filePath = req.file.path;
      const htmlPath = `${filePath}.html`;
      const command = `pdf2htmlEX --dest-dir public --zoom 1.5 ${filePath}`;

      console.log("Executing command:", command);

      await new Promise<void>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error("Error executing pdf2htmlEX:", error);
            console.error("stderr:", stderr);
            reject(new Error("Failed to convert PDF"));
          } else {
            console.log("stdout:", stdout);
            resolve();
          }
        });
      });

      res.json({ url: `http://localhost:3000/public/${htmlPath}` });
    } catch (err) {
      console.error("Error during conversion:", err);
      res.status(500).json({ error: "Failed to process PDF" });
    }
  }
);

export default router;
