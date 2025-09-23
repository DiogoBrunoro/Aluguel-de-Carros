import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./adapters/routes/ClienteRoutes";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
