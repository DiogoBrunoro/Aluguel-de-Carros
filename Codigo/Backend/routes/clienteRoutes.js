import express from "express";
import {
  criarCliente,
  listarClientes,
  buscarCliente,
  atualizarCliente,
  excluirCliente,
} from "../controllers/clienteController.js";

const router = express.Router();

router.post("/clientes", criarCliente);
router.get("/clientes", listarClientes);
router.get("/clientes/:id", buscarCliente);
router.put("/clientes/:id", atualizarCliente);
router.delete("/clientes/:id", excluirCliente);

export default router;
