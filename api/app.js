import { writeFile } from "node:fs/promises";
import express from "express";
import cors from "cors";
import multer from "multer";
import parser from "./modules/parser.js";
import interpreter from "./modules/interpreter.js";
import generate from "./modules/generate.js";

const app = express();

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
  let { base, orm, db } = req.query;
  if (req.file) {
    const { buffer } = req.file;
    content = JSON.parse(buffer.toString("utf8"));
  }
  const fields = interpreter(content, base);
  const prompt = generate(fields, orm, db);
  try {
    const { generated_text } = await parser(prompt);
    return res.status(200).send(generated_text);
  } catch (error) {
    throw new Error(error);
  }
};
app.post("/analize", upload.single("file"), analize);
