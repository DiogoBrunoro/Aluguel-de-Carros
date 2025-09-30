import type { IContratoRepository } from "../../application/interface/IContratoRepository.js";
import type { Contrato } from "../../application/model/ContratoModel.js";
import type { CreateContratoDTO, UpdateContratoDTO } from "../../application/dto/ContratoDTO.js";
import sql from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

export class ContratoRepository implements IContratoRepository {
    async create(contratoData: CreateContratoDTO): Promise<Contrato> {
        const id = uuidv4();
        const contrato = await sql`
            INSERT INTO contratos (id, pedido_id, tipo_propriedade, credito_bancario, status)
            VALUES (${id},
                 ${contratoData.pedidoId}, 
                 ${contratoData.tipoPropriedade}, 
                 ${contratoData.creditoBancario ?? null}, 
                 'PENDENTE') RETURNING *;
        `;
        return this.mapToContrato(contrato[0]);
    }

    async findAll(): Promise<Contrato[]> {
        const contratos = await sql`SELECT * FROM contratos ORDER BY created_at DESC;`;
        return contratos.map(this.mapToContrato);
    }

    async findById(id: string): Promise<Contrato | null> {
        const contrato = await sql`SELECT * FROM contratos WHERE id = ${id};`;
        if (!contrato[0]) return null;
        return this.mapToContrato(contrato[0]);
    }

    async update(id: string, contratoData: UpdateContratoDTO): Promise<Contrato | null> {
        const contrato = await sql`
            UPDATE contratos SET
                tipo_propriedade = COALESCE(${contratoData.tipoPropriedade ?? null}, tipo_propriedade),
                credito_bancario = COALESCE(${contratoData.creditoBancario ?? null}, credito_bancario),
                status = COALESCE(${contratoData.status ?? null}, status),
                updated_at = now()
            WHERE id = ${id}
            RETURNING *;
        `;
        if (!contrato[0]) return null;
        return this.mapToContrato(contrato[0]);
    }

    async delete(id: string): Promise<boolean> {
        const result = await sql`DELETE FROM contratos WHERE id = ${id};`;
        return result.count > 0;
    }

    async findByPedidoId(pedidoId: string): Promise<Contrato | null> {
        const contrato = await sql`SELECT * FROM contratos WHERE pedido_id = ${pedidoId};`;
        if (!contrato[0]) return null;
        return this.mapToContrato(contrato[0]);
    }

    private mapToContrato(row: any): Contrato {
        return {
            id: row.id,
            pedidoId: row.pedido_id,
            tipoPropriedade: row.tipo_propriedade,
            creditoBancario: row.credito_bancario,
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
    }
}
