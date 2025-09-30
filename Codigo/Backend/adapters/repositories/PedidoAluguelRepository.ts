import { PedidoAluguel } from "../../application/model/PedidoAluguelModel.js";
import { IPedidoAluguelRepository } from "../../application/interface/IPedidoAluguel.js";
import sql from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { Automovel } from "../../application/model/AutomovelModel.js";

export class PedidoAluguelRepository implements IPedidoAluguelRepository{

    async createPedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel> {
        const result = await sql<PedidoAluguel[]>`
            INSERT INTO pedidos_aluguel (id, cliente_id, automovel_id, data_inicio, data_fim, valor, status)
            VALUES (
                ${pedido.id},
                ${pedido.clienteId},
                ${pedido.automovelId},
                ${pedido.dataInicio},
                ${pedido.dataFim},
                ${pedido.valor},
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
            SELECT * FROM pedidos_aluguel WHERE id = ${id}
        `;
        return result[0] || null;
    }

    async updatePedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel> {
        const result = await sql<PedidoAluguel[]>`
            UPDATE pedidos_aluguel
            SET 
                cliente_id = ${pedido.clienteId},
                automovel_id = ${pedido.automovelId},
                data_inicio = ${pedido.dataInicio},
                data_fim = ${pedido.dataFim},
                valor = ${pedido.valor},
                status = ${pedido.status}
            WHERE id = ${pedido.id}
            RETURNING *;
        `;
        return result[0];
    }

    async listPedidosAluguel(): Promise<PedidoAluguel[]> {
        const result = await sql<PedidoAluguel[]>`
            SELECT * FROM pedidos_aluguel
        `;
        return result;
    }

}