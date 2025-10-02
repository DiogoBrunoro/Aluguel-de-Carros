import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./adapters/routes/UserRoutes.js"; 
import loginRoutes from "./adapters/routes/LoginRoutes.js";
import automovelRoutes from "./adapters/routes/AutomovelRoutes.js";
import aluguelRoutes from "./adapters/routes/PedidoAluguel.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin:['http://localhost:5173', 'https://aluguel-de-carros-topaz.vercel.app/'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true, 
  optionsSuccessStatus: 204 
};
app.use(cors(corsOptions));

app.use(express.json()); 
app.use("/api/users", userRoutes);
app.use("/api/users", loginRoutes); 
app.use("/api/aluguel", aluguelRoutes)
app.use("/api/automoveis",automovelRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
