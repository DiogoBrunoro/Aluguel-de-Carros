import type { IAutomovelRepository } from "../../application/interface/IAutomovelRepository.js";
import type { Automovel } from "../../application/model/AutomovelModel.js";
import type { CreateAutomovelDTO, UpdateAutomovelDTO } from "../../application/dto/AutomovelDTO.js";
import sql from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

export class AutomovelRepository implements IAutomovelRepository {
    async create(automovelData: CreateAutomovelDTO): Promise<Automovel> {
        const id = uuidv4();
        const automovel = await sql`
            INSERT INTO automoveis (id, marca, modelo, ano, matricula, placa, disponivel)
            VALUES (${id}, ${automovelData.marca}, ${automovelData.modelo}, ${automovelData.ano}, ${automovelData.matricula}, ${automovelData.placa}, ${automovelData.disponivel ?? true})
            RETURNING *;
        `;
        return this.mapToAutomovel(automovel[0]);
    }

    async findAll(): Promise<Automovel[]> {
        const automoveis = await sql`SELECT * FROM automoveis ORDER BY created_at DESC;`;
        return automoveis.map(this.mapToAutomovel);
    }

    async findById(id: string): Promise<Automovel | null> {
        const automovel = await sql`SELECT * FROM automoveis WHERE id = ${id};`;
        if (!automovel[0]) return null;
        return this.mapToAutomovel(automovel[0]);
    }

    async update(id: string, automovelData: UpdateAutomovelDTO): Promise<Automovel | null> {
        const automovel = await sql`
            UPDATE automoveis SET
                marca = COALESCE(${automovelData.marca ?? null}, marca),
                modelo = COALESCE(${automovelData.modelo ?? null}, modelo),
                ano = COALESCE(${automovelData.ano ?? null}, ano),
                matricula = COALESCE(${automovelData.matricula ?? null}, matricula),
                placa = COALESCE(${automovelData.placa ?? null}, placa),
                disponivel = COALESCE(${automovelData.disponivel ?? null}, disponivel),
                updated_at = now()
            WHERE id = ${id}
            RETURNING *;
        `;
        if (!automovel[0]) return null;
        return this.mapToAutomovel(automovel[0]);
    }

    async delete(id: string): Promise<boolean> {
        const result = await sql`DELETE FROM automoveis WHERE id = ${id};`;
        return result.count > 0;
    }

    async findDisponiveis(): Promise<Automovel[]> {
        const automoveis = await sql`SELECT * FROM automoveis WHERE disponivel = true ORDER BY created_at DESC;`;
        return automoveis.map(this.mapToAutomovel);
    }

    private mapToAutomovel(row: any): Automovel {
        return {
            id: row.id,
            marca: row.marca,
            modelo: row.modelo,
            ano: row.ano,
            matricula: row.matricula,
            placa: row.placa,
            disponivel: row.disponivel,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
    }
}
