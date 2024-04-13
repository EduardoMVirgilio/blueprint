import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
