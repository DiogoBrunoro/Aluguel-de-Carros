import { IContratoRepository } from "../../application/interface/IContrato.js";
import { Contrato } from "../../application/model/ContratoModel.js";
import sql from "../config/database.js";

export class ContratoRepository implements IContratoRepository {
    async createContrato(contrato: Contrato): Promise<Contrato> {
        const result = await sql<Contrato[]>`
            INSERT INTO contratos (id, pedido_id, cliente_id, automovel_id, agente_id, data_inicio, data_fim, valor, propriedade)
            VALUES (
                ${contrato.id},
                ${contrato.pedido_id},
                ${contrato.cliente_id},
                ${contrato.automovel_id},
                ${contrato.agente_id},
                ${contrato.data_inicio},
                ${contrato.data_fim},
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
                pedido_id = ${contrato.pedido_id},
                cliente_id = ${contrato.cliente_id},
                automovel_id = ${contrato.automovel_id},
                agente_id = ${contrato.agente_id},
                data_inicio = ${contrato.data_inicio},
                data_fim = ${contrato.data_fim},
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