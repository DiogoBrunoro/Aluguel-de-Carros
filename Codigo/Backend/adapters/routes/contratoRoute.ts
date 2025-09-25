// routes/contratoRoutes.ts
import express from "express";
import { criarContrato, atualizarContrato, buscarContratoPorPedido } from "../controllers/ContratoController";

const ContratoRouter = express.Router();

// Rotas para Contratos
ContratoRouter.post("/contratos", criarContrato);
ContratoRouter.put("/contratos/:id", atualizarContrato);
ContratoRouter.get("/contratos/pedido/:pedidoId", buscarContratoPorPedido);
// Se você tiver funções para listar todos, buscar por ID ou excluir, adicione-as aqui:
// ContratoRouter.get("/contratos", listarContratos);
// ContratoRouter.get("/contratos/:id", buscarContrato);
// ContratoRouter.delete("/contratos/:id", excluirContrato);


export default ContratoRouter;