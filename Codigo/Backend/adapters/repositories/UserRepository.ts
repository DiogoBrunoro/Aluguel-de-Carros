import { Usuario } from "../../application/model/UsuarioModel.js";
import { IUserRepository } from "../../application/interface/IUserRepository.js";
import sql from "../config/database.js";
 import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt";
import { AgenteModel } from "../../application/model/AgenteModel.js";
import { Cliente } from "../../application/model/ClienteModel.js";
export class UserRepository implements IUserRepository {

  // Buscar usuário pelo email
  async findByEmail(email: string): Promise<Usuario | null> {
    const result = await sql<Usuario[]>`
      SELECT * FROM usuarios WHERE email = ${email}
    `;
    return result[0] || null;
  }

  // Buscar usuário pelo id
  async getUserById(id: string): Promise<Usuario | null> {
    const result = await sql<Usuario[]>`
      SELECT * FROM usuarios WHERE id = ${id}
    `;
    return result[0] || null;
  }

  // Criar Cliente
  async createUserCliente(cliente: Cliente): Promise<Cliente> {
    const result = await sql<Cliente[]>`
      INSERT INTO usuarios (id, nome, email, senha, role, profissao, empregadores)
      VALUES (
        ${cliente.id},
        ${cliente.nome},
        ${cliente.email},
        ${cliente.senha},
        ${cliente.role},
        ${cliente.profissao},
        ${JSON.stringify(cliente.empregadores)} -- salvar array como JSON
      )
      RETURNING *;
    `;
    return result[0];
  }

  // Criar Agente
  async createUserAgente(agente: AgenteModel): Promise<AgenteModel> {
    const result = await sql<AgenteModel[]>`
      INSERT INTO usuarios (id, nome, email, senha, role, tipo)
      VALUES (
        ${agente.id},
        ${agente.nome},
        ${agente.email},
        ${agente.senha},
        ${agente.role},
        ${agente.tipo}
      )
      RETURNING *;
    `;
    return result[0];
  }
}
