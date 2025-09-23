"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClienteController_1 = require("../controllers/ClienteController");
const router = express_1.default.Router();
router.post("/clientes", ClienteController_1.criarCliente);
router.get("/clientes", ClienteController_1.listarClientes);
router.get("/clientes/:id", ClienteController_1.buscarCliente);
router.get("/clientes/cpf/:cpf", ClienteController_1.buscarClientePorCpf);
router.put("/clientes/:id", ClienteController_1.atualizarCliente);
router.delete("/clientes/:id", ClienteController_1.excluirCliente);
exports.default = router;
