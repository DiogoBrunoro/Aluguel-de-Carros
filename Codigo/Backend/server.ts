import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import clienteRoutes from "./adapters/routes/clienteRoutes"

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use("/api", clienteRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
