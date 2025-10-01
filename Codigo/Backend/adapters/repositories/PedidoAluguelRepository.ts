import { PedidoAluguel } from "../../application/model/PedidoAluguelModel.js";
import { IPedidoAluguelRepository } from "../../application/interface/IPedidoAluguel.js";
import sql from "../config/database.js";
import { Automovel } from "../../application/model/AutomovelModel.js";
import { listarPedidoAluguelDTO } from "../../application/dto/PedidoAluguelDTO.js";

export class PedidoAluguelRepository implements IPedidoAluguelRepository{

    async createPedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel> {
        const result = await sql<PedidoAluguel[]>`
            INSERT INTO aluguel (cliente_id, automovel_id, data_inicio, data_fim, valor_diario, status)
            VALUES (
                ${pedido.clienteId},
                ${pedido.automovelId},
                ${pedido.data_inicio},
                ${pedido.data_fim},
                ${pedido.valor_diario},
                ${pedido.status}
            )
            RETURNING *;
        `;
        await sql<Automovel[]>`
            UPDATE automoveis
            SET disponivel = false
            WHERE id = ${pedido.automovelId};
        `;
        return result[0];
    }

    async getPedidoAluguelById(id: string): Promise<PedidoAluguel | null> {
        const result = await sql<PedidoAluguel[]>`
            SELECT * FROM aluguel WHERE id = ${id}
        `;
        return result[0] || null;
    }

    async updatePedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel> {
        console.log("UPDATE")
        console.log(pedido)

        if(!pedido.id){
            throw new Error("Pedido de aluguel nao encontrado")
        }
        const result = await sql<PedidoAluguel[]>`
            UPDATE aluguel
            SET 
                cliente_id = ${pedido.clienteId},
                automovel_id = ${pedido.automovelId},
                data_inicio = ${pedido.data_inicio},
                data_fim = ${pedido.data_fim},
                valor_diario = ${pedido.valor_diario},
                status = ${pedido.status}
            WHERE id = ${pedido.id}
            RETURNING *;
        `;

        console.log(result)
        return result[0];
    }

    async listPedidosAluguel(id: string): Promise<listarPedidoAluguelDTO[]> {
        const result = await sql<listarPedidoAluguelDTO[]>`
            SELECT
                a.id,
                a.cliente_id AS "clienteId",
                a.automovel_id AS "automovelId", 
                a.data_inicio AS "dataInicio",
                a.data_fim AS "dataFim",
                a.status,
                a.valor_diario AS "valorDiario", 
                
                json_build_object(
                    'id', m.id,
                    'marca', m.marca,
                    'modelo', m.modelo,
                    'ano', m.ano,
                    'matricula', m.matricula,
                    'placa', m.placa,
                    'disponivel', m.disponivel
                ) AS automovel
            FROM
                aluguel a
            JOIN
                automoveis m ON a.automovel_id = m.id 
            WHERE
                a.cliente_id = ${id};
        `;
        return result;
    }

}