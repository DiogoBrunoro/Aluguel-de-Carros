import { Automovel } from "../../application/model/AutomovelModel.js";
import { IAutomovelRepository } from "../../application/interface/IAutomovelRepository.js";
import sql from "../config/database.js";

export class AutomovelRepository implements IAutomovelRepository {
  async createAutomovel(automovel: Automovel): Promise<Automovel> {
    const result = await sql<Automovel[]>`
        INSERT INTO automoveis (id, marca, modelo, ano, matricula, placa, disponivel)
        VALUES (
          ${automovel.id},
          ${automovel.marca},
          ${automovel.modelo},
          ${automovel.ano},
          ${automovel.matricula},
          ${automovel.placa},
          ${automovel.disponivel}
        )
        RETURNING *;
      `;
    return result[0];
  }

  async getAutomovelById(id: string): Promise<Automovel | null> {
    const result = await sql<Automovel[]>`
        SELECT * FROM automoveis WHERE id = ${id}
      `;
    return result[0] || null;
  }

  async updateAutomovel(automovel: Automovel): Promise<Automovel> {
    const result = await sql<Automovel[]>`
        UPDATE automoveis
        SET 
          marca = ${automovel.marca},
          modelo = ${automovel.modelo},
          ano = ${automovel.ano},
          matricula = ${automovel.matricula},
          placa = ${automovel.placa},
          disponivel = ${automovel.disponivel}
        WHERE id = ${automovel.id}
        RETURNING *;
      `;
    return result[0];
  }

  async deleteAutomovel(id: string): Promise<void> {
    await sql`
        DELETE FROM automoveis WHERE id = ${id}
      `;
  }

  async listAutomoveis(): Promise<Automovel[]> {
    const result = await sql<Automovel[]>`
        SELECT * FROM automoveis where disponivel = true
      `;
    return result;
  }
}
