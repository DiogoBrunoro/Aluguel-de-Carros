import type { IClienteRepository } from "../../application/interface/IClienteRepository"
import type { Cliente } from "../../application/model/ClienteModel"
import type { CreateClienteDTO, UpdateClienteDTO } from "../../application/dto/ClienteDTO"
import sql from "../config/database"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt";

export class ClienteRepository implements IClienteRepository {
    async create(clienteData: CreateClienteDTO): Promise<Cliente> {
        const clienteId = uuidv4();

        try {
            // Validar rendimentos
            if (!clienteData.rendimentos || clienteData.rendimentos.length !== 3) {
                throw new Error("Rendimentos deve conter exatamente 3 valores");
            }

            // Criptografar a senha
            const senhaHash = clienteData.senha ? await bcrypt.hash(clienteData.senha, 10) : null;

            // Inserir cliente
            const cliente = await sql`
                INSERT INTO clientes 
                    (id, rg, cpf, nome, endereco, profissao, rendimentos, empregadores, senha)
                VALUES 
                    (${clienteId}, 
                     ${clienteData.rg}, 
                     ${clienteData.cpf}, 
                     ${clienteData.nome}, 
                     ${clienteData.endereco}, 
                     ${clienteData.profissao || null}, 
                     ${clienteData.rendimentos}, 
                     ${clienteData.empregadores}, 
                     ${senhaHash})
                RETURNING *;
            `;

            // Inserir entidades empregadoras se existirem
            if (clienteData.empregadores && clienteData.empregadores.length > 0) {
                for (let i = 0; i < clienteData.empregadores.length; i++) {
                    const empregador = clienteData.empregadores[i];
                    const rendimento = clienteData.rendimentos[i] || 0;

                    await sql`
                        INSERT INTO entidades_empregadoras (cliente_id, nome, rendimento)
                        VALUES (${clienteId}, ${empregador}, ${rendimento});
                    `;
                }
            }

            return this.mapToCliente(cliente[0]);
        } catch (error) {
            throw new Error(`Erro ao criar cliente: ${error}`);
        }
    }

    async findAll(): Promise<Cliente[]> {
        try {
            const clientes = await sql`SELECT * FROM clientes ORDER BY created_at DESC;`
            return clientes.map((cliente) => this.mapToCliente(cliente))
        } catch (error) {
            throw new Error(`Erro ao buscar clientes: ${error}`)
        }
    }

    async findById(id: string): Promise<Cliente | null> {
        try {
            const cliente = await sql`SELECT * FROM clientes WHERE id = ${id};`

            if (!cliente[0]) {
                return null
            }

            return this.mapToCliente(cliente[0])
        } catch (error) {
            throw new Error(`Erro ao buscar cliente por ID: ${error}`)
        }
    }

    async findByCpf(cpf: string): Promise<Cliente | null> {
        try {
            const cliente = await sql`SELECT * FROM clientes WHERE cpf = ${cpf};`

            if (!cliente[0]) {
                return null
            }

            return this.mapToCliente(cliente[0])
        } catch (error) {
            throw new Error(`Erro ao buscar cliente por CPF: ${error}`)
        }
    }

    async findByRg(rg: string): Promise<Cliente | null> {
        try {
            const cliente = await sql`SELECT * FROM clientes WHERE rg = ${rg};`

            if (!cliente[0]) {
                return null
            }

            return this.mapToCliente(cliente[0])
        } catch (error) {
            throw new Error(`Erro ao buscar cliente por RG: ${error}`)
        }
    }

    async update(id: string, clienteData: UpdateClienteDTO): Promise<Cliente | null> {
        try {
            // Validar rendimentos se fornecido
            if (clienteData.rendimentos && clienteData.rendimentos.length !== 3) {
                throw new Error("Rendimentos deve conter exatamente 3 valores")
            }

            const cliente = await sql`
        UPDATE clientes SET
    rg = COALESCE(${clienteData.rg ?? null}, rg),
    cpf = COALESCE(${clienteData.cpf ?? null}, cpf),
    nome = COALESCE(${clienteData.nome ?? null}, nome),
    endereco = COALESCE(${clienteData.endereco ?? null}, endereco),
    profissao = COALESCE(${clienteData.profissao ?? null}, profissao),
    rendimentos = COALESCE(${clienteData.rendimentos ?? null}, rendimentos),
    empregadores = COALESCE(${clienteData.empregadores ?? null}, empregadores),
          updated_at = now()
        WHERE id = ${id}
        RETURNING *;
      `

            if (!cliente[0]) {
                return null
            }

            // Atualizar entidades empregadoras se fornecido
            if (clienteData.empregadores) {
                // Deletar empregadores antigos
                await sql`DELETE FROM entidades_empregadoras WHERE cliente_id = ${id};`

                // Inserir novos empregadores
                for (let i = 0; i < clienteData.empregadores.length; i++) {
                    const empregador = clienteData.empregadores[i]
                    const rendimento = clienteData.rendimentos ? clienteData.rendimentos[i] || 0 : 0

                    await sql`
            INSERT INTO entidades_empregadoras (cliente_id, nome, rendimento)
            VALUES (${id}, ${empregador}, ${rendimento});
          `
                }
            }

            return this.mapToCliente(cliente[0])
        } catch (error) {
            throw new Error(`Erro ao atualizar cliente: ${error}`)
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await sql`DELETE FROM clientes WHERE id = ${id};`
            return result.count > 0
        } catch (error) {
            throw new Error(`Erro ao deletar cliente: ${error}`)
        }
    }

    private mapToCliente(row: any): Cliente {
        return {
            id: row.id,
            nome: row.nome,
            rg: row.rg,
            cpf: row.cpf,
            endereco: row.endereco,
            profissao: row.profissao,
            rendimentos: row.rendimentos || [0, 0, 0],
            empregadores: row.empregadores || [],
            senha: row.senha, // agora incluído para login
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
    }
}
