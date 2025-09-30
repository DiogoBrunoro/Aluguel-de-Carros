import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ClienteRouter from "./adapters/routes/clienteRoutes.js";
import AutomovelRouter from "./adapters/routes/automovelRoute.js";
import ContratoRouter from "./adapters/routes/contratoRoute.js";
import PedidoRouter from "./adapters/routes/pedidoRoute.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api', ClienteRouter);     
app.use('/api', AutomovelRouter);   
app.use('/api', ContratoRouter);    
app.use('/api', PedidoRouter);     

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
