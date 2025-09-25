import express from "express";
import { criarCliente, listarClientes, atualizarCliente, buscarCliente, buscarClientePorCpf, excluirCliente } from "../controllers/clienteController"
import { loginCliente } from "../controllers/AuthController";

const router = express.Router();

router.post("/clientes", criarCliente)
router.get("/clientes", listarClientes)
router.get("/clientes/:id", buscarCliente)
router.get("/clientes/cpf/:cpf", buscarClientePorCpf)
router.put("/clientes/:id", atualizarCliente)
router.delete("/clientes/:id", excluirCliente)
router.post("/login", loginCliente)


export default router;
