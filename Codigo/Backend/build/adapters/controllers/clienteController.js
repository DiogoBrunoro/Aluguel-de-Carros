"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirCliente = exports.atualizarCliente = exports.buscarClientePorCpf = exports.buscarCliente = exports.listarClientes = exports.criarCliente = void 0;
const ClienteService_1 = require("../../application/service/ClienteService");
const ClienteRepository_1 = require("../repositories/ClienteRepository");
// Dependency Injection
const clienteRepository = new ClienteRepository_1.ClienteRepository();
const clienteService = new ClienteService_1.ClienteService(clienteRepository);
const criarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clienteData = req.body;
        const cliente = yield clienteService.criarCliente(clienteData);
        res.status(201).json({
            success: true,
            data: cliente,
            message: "Cliente criado com sucesso",
        });
    }
    catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(400).json({
            success: false,
            error: error.message || "Erro interno do servidor",
        });
    }
});
exports.criarCliente = criarCliente;
const listarClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield clienteService.listarClientes();
        res.json({
            success: true,
            data: clientes,
            total: clientes.length,
        });
    }
    catch (error) {
        console.error("Erro ao listar clientes:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Erro interno do servidor",
        });
    }
});
exports.listarClientes = listarClientes;
const buscarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cliente = yield clienteService.buscarClientePorId(id);
        if (!cliente) {
            return res.status(404).json({
                success: false,
                error: "Cliente não encontrado",
            });
        }
        res.json({
            success: true,
            data: cliente,
        });
    }
    catch (error) {
        console.error("Erro ao buscar cliente:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Erro interno do servidor",
        });
    }
});
exports.buscarCliente = buscarCliente;
const buscarClientePorCpf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cpf } = req.params;
        const cliente = yield clienteService.buscarClientePorCpf(cpf);
        if (!cliente) {
            return res.status(404).json({
                success: false,
                error: "Cliente não encontrado",
            });
        }
        res.json({
            success: true,
            data: cliente,
        });
    }
    catch (error) {
        console.error("Erro ao buscar cliente por CPF:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Erro interno do servidor",
        });
    }
});
exports.buscarClientePorCpf = buscarClientePorCpf;
const atualizarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const clienteData = req.body;
        const cliente = yield clienteService.atualizarCliente(id, clienteData);
        if (!cliente) {
            return res.status(404).json({
                success: false,
                error: "Cliente não encontrado",
            });
        }
        res.json({
            success: true,
            data: cliente,
            message: "Cliente atualizado com sucesso",
        });
    }
    catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(400).json({
            success: false,
            error: error.message || "Erro interno do servidor",
        });
    }
});
exports.atualizarCliente = atualizarCliente;
const excluirCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sucesso = yield clienteService.excluirCliente(id);
        if (!sucesso) {
            return res.status(404).json({
                success: false,
                error: "Cliente não encontrado",
            });
        }
        res.json({
            success: true,
            message: "Cliente removido com sucesso",
        });
    }
    catch (error) {
        console.error("Erro ao excluir cliente:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Erro interno do servidor",
        });
    }
});
exports.excluirCliente = excluirCliente;
