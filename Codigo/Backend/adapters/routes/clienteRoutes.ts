import express from "express";
import { criarCliente, listarClientes, atualizarCliente, buscarCliente, buscarClientePorCpf, excluirCliente } from "../controllers/clienteController"
import { loginCliente } from "../controllers/AuthController";

const ClienteRouter = express.Router();

ClienteRouter.post("/clientes", criarCliente)
ClienteRouter.get("/clientes", listarClientes)
ClienteRouter.get("/clientes/:id", buscarCliente)
ClienteRouter.get("/clientes/cpf/:cpf", buscarClientePorCpf)
ClienteRouter.put("/clientes/:id", atualizarCliente)
ClienteRouter.delete("/clientes/:id", excluirCliente)
ClienteRouter.post("/login", loginCliente)


export default ClienteRouter;
