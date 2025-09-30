import { IContratoRepository } from "../../application/interface/IContrato";
import { Contrato } from "../../application/model/ContratoModel";
import sql from "../config/database";

export class ContratoRepository implements IContratoRepository {
    async createContrato(contrato: Contrato): Promise<Contrato> {
        const result = await sql<Contrato[]>`
            INSERT INTO contratos (id, pedido_id, cliente_id, automovel_id, agente_id, data_inicio, data_fim, valor, propriedade)
            VALUES (
                ${contrato.id},
                ${contrato.pedidoId},
                ${contrato.clienteId},
                ${contrato.automovelId},
                ${contrato.agenteId},
                ${contrato.dataInicio},
                ${contrato.dataFim},
                ${contrato.valor},
                ${contrato.propriedade}
            )
            RETURNING *;
        `;
        return result[0];
    }

    async getContratoById(id: string): Promise<Contrato | null> {
        const result = await sql<Contrato[]>`
            SELECT * FROM contratos WHERE id = ${id}
        `;
        return result[0] || null;
    }

    async updateContrato(contrato: Contrato): Promise<Contrato> {
        const result = await sql<Contrato[]>`
            UPDATE contratos
            SET 
                pedido_id = ${contrato.pedidoId},
                cliente_id = ${contrato.clienteId},
                automovel_id = ${contrato.automovelId},
                agente_id = ${contrato.agenteId},
                data_inicio = ${contrato.dataInicio},
                data_fim = ${contrato.dataFim},
                valor = ${contrato.valor},
                propriedade = ${contrato.propriedade}
            WHERE id = ${contrato.id}
            RETURNING *;
        `;
        return result[0];
    }

    async listContratos(): Promise<Contrato[]> {
        const result = await sql<Contrato[]>`
            SELECT * FROM contratos
        `;
        return result;
    }
}