import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
const app = express();

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/json') {
      return cb(new Error('Solo se permiten archivos JSON'));
    }
    cb(null, true);
  };
  
const upload = multer({storage: multer.memoryStorage(),fileFilter})
const read = (req, res) => {
    let content = req.body
    if(req.file){
        const { buffer } = req.file;
        content = JSON.parse(buffer.toString('utf8')); 
    }
    return res.json(content)
}
app.post("/analize",upload.single('file'),read)