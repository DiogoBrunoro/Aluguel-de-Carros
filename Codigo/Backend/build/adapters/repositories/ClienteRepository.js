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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("uuid");
class ClienteRepository {
    create(clienteData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente_id = (0, uuid_1.v4)();
            try {
                // Validar que rendimentos tem exatamente 3 valores
                if (!clienteData.rendimentos || clienteData.rendimentos.length !== 3) {
                    throw new Error("Rendimentos deve conter exatamente 3 valores");
                }
                // Inserir cliente
                const cliente = yield (0, database_1.default) `
        INSERT INTO clientes (id, rg, cpf, nome, endereco, profissao, rendimentos, empregadores)
        VALUES (
          ${cliente_id}, 
          ${clienteData.rg}, 
          ${clienteData.cpf}, 
          ${clienteData.nome}, 
          ${clienteData.endereco}, 
          ${clienteData.profissao || null},
          ${JSON.stringify(clienteData.rendimentos)},
          ${JSON.stringify(clienteData.empregadores)}
        )
        RETURNING *;
      `;
                // Inserir entidades empregadoras se existirem
                if (clienteData.empregadores && clienteData.empregadores.length > 0) {
                    for (let i = 0; i < clienteData.empregadores.length; i++) {
                        const empregador = clienteData.empregadores[i];
                        const rendimento = clienteData.rendimentos[i] || 0;
                        yield (0, database_1.default) `
            INSERT INTO entidades_empregadoras (cliente_id, nome, rendimento)
            VALUES (${cliente_id}, ${empregador}, ${rendimento});
          `;
                    }
                }
                return this.mapToCliente(cliente[0]);
            }
            catch (error) {
                throw new Error(`Erro ao criar cliente: ${error}`);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield (0, database_1.default) `SELECT * FROM clientes ORDER BY created_at DESC;`;
                return clientes.map((cliente) => this.mapToCliente(cliente));
            }
            catch (error) {
                throw new Error(`Erro ao buscar clientes: ${error}`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield (0, database_1.default) `SELECT * FROM clientes WHERE id = ${id};`;
                if (!cliente[0]) {
                    return null;
                }
                return this.mapToCliente(cliente[0]);
            }
            catch (error) {
                throw new Error(`Erro ao buscar cliente por ID: ${error}`);
            }
        });
    }
    findByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield (0, database_1.default) `SELECT * FROM clientes WHERE cpf = ${cpf};`;
                if (!cliente[0]) {
                    return null;
                }
                return this.mapToCliente(cliente[0]);
            }
            catch (error) {
                throw new Error(`Erro ao buscar cliente por CPF: ${error}`);
            }
        });
    }
    findByRg(rg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield (0, database_1.default) `SELECT * FROM clientes WHERE rg = ${rg};`;
                if (!cliente[0]) {
                    return null;
                }
                return this.mapToCliente(cliente[0]);
            }
            catch (error) {
                throw new Error(`Erro ao buscar cliente por RG: ${error}`);
            }
        });
    }
    update(id, clienteData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validar rendimentos se fornecido
                if (clienteData.rendimentos && clienteData.rendimentos.length !== 3) {
                    throw new Error("Rendimentos deve conter exatamente 3 valores");
                }
                const cliente = yield (0, database_1.default) `
        UPDATE clientes SET
          rg = COALESCE(${clienteData.rg}, rg),
          cpf = COALESCE(${clienteData.cpf}, cpf),
          nome = COALESCE(${clienteData.nome}, nome),
          endereco = COALESCE(${clienteData.endereco}, endereco),
          profissao = COALESCE(${clienteData.profissao}, profissao),
          rendimentos = COALESCE(${clienteData.rendimentos ? JSON.stringify(clienteData.rendimentos) : null}, rendimentos),
          empregadores = COALESCE(${clienteData.empregadores ? JSON.stringify(clienteData.empregadores) : null}, empregadores),
          updated_at = now()
        WHERE id = ${id}
        RETURNING *;
      `;
                if (!cliente[0]) {
                    return null;
                }
                // Atualizar entidades empregadoras se fornecido
                if (clienteData.empregadores) {
                    // Deletar empregadores antigos
                    yield (0, database_1.default) `DELETE FROM entidades_empregadoras WHERE cliente_id = ${id};`;
                    // Inserir novos empregadores
                    for (let i = 0; i < clienteData.empregadores.length; i++) {
                        const empregador = clienteData.empregadores[i];
                        const rendimento = clienteData.rendimentos ? clienteData.rendimentos[i] || 0 : 0;
                        yield (0, database_1.default) `
            INSERT INTO entidades_empregadoras (cliente_id, nome, rendimento)
            VALUES (${id}, ${empregador}, ${rendimento});
          `;
                    }
                }
                return this.mapToCliente(cliente[0]);
            }
            catch (error) {
                throw new Error(`Erro ao atualizar cliente: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, database_1.default) `DELETE FROM clientes WHERE id = ${id};`;
                return result.count > 0;
            }
            catch (error) {
                throw new Error(`Erro ao deletar cliente: ${error}`);
            }
        });
    }
    mapToCliente(row) {
        return {
            id: row.id,
            nome: row.nome,
            rg: row.rg,
            cpf: row.cpf,
            endereco: row.endereco,
            profissao: row.profissao,
            rendimentos: row.rendimentos ? row.rendimentos : [0, 0, 0],
            empregadores: row.empregadores ? row.empregadores : [],
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
    }
}
exports.ClienteRepository = ClienteRepository;
