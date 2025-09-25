import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ClienteRouter from "./adapters/routes/clienteRoutes";
import AutomovelRouter from "./adapters/routes/automovelRoute";
import ContratoRouter from "./adapters/routes/contratoRoute";
import PedidoRouter from "./adapters/routes/pedidoRoute";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api', ClienteRouter);     
app.use('/api', AutomovelRouter);   
app.use('/api', ContratoRouter);    
app.use('/api', PedidoRouter);     

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
