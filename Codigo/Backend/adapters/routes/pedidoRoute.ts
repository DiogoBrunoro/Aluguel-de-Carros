// routes/pedidoRoutes.ts
import express from "express";
import { criarPedido, listarPedidosPorCliente, atualizarPedido, cancelarPedido } from "../controllers/PedidoController.js";

const PedidoRouter = express.Router();

// Rotas para Pedidos
PedidoRouter.post("/pedidos", criarPedido);
PedidoRouter.get("/pedidos/cliente/:clienteId", listarPedidosPorCliente);
PedidoRouter.put("/pedidos/:id", atualizarPedido);
PedidoRouter.patch("/pedidos/:id/cancelar", cancelarPedido); // Usando PATCH para uma atualização parcial de status
// Se você tiver funções para listar todos, buscar por ID ou excluir, adicione-as aqui:
// PedidoRouter.get("/pedidos", listarPedidos);
// PedidoRouter.get("/pedidos/:id", buscarPedido);
// PedidoRouter.delete("/pedidos/:id", excluirPedido);


export default PedidoRouter;