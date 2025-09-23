import express from "express";
import { criarCliente, listarClientes, atualizarCliente, buscarCliente, buscarClientePorCpf, excluirCliente } from "../controllers/ClienteController";

const router = express.Router();

router.post("/clientes", criarCliente)
router.get("/clientes", listarClientes)
router.get("/clientes/:id", buscarCliente)
router.get("/clientes/cpf/:cpf", buscarClientePorCpf)
router.put("/clientes/:id", atualizarCliente)
router.delete("/clientes/:id", excluirCliente)

export default router;
