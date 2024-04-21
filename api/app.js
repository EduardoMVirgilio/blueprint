import express from "express";
import cors from "cors";
import multer from "multer";
import parser from "./modules/parser.js";
import interpreter from "./modules/interpreter.js";
const app = express();
import { writeFile } from "node:fs/promises";

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/json") {
    return cb(new Error("Solo se permiten archivos JSON"));
  }
  cb(null, true);
};

const upload = multer({ storage: multer.memoryStorage(), fileFilter });
const analize = async (req, res) => {
  let content = req.body;
  if (req.file) {
    const { buffer } = req.file;
    content = JSON.parse(buffer.toString("utf8"));
  }
  const fields = interpreter(content, "user");
  const models = Object.keys(fields);
  try {
    const { generated_text } = await parser(JSON.stringify(fields, null, 2));
    await writeFile("./out.txt", generated_text);
    return res.status(200).send(generated_text);
  } catch (error) {
    throw new Error(error);
  }
};
app.post("/analize", upload.single("file"), analize);
