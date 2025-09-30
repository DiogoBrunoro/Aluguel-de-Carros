import type { Cliente } from "../model/ClienteModel.js"
import type { CreateClienteDTO, UpdateClienteDTO } from "../dto/ClienteDTO.js"

export interface IClienteRepository {
  create(clienteData: CreateClienteDTO): Promise<Cliente>
  findAll(): Promise<Cliente[]>
  findById(id: string): Promise<Cliente | null>
  update(id: string, clienteData: UpdateClienteDTO): Promise<Cliente | null>
  delete(id: string): Promise<boolean>
  findByCpf(cpf: string): Promise<Cliente | null>
  findByRg(rg: string): Promise<Cliente | null>
}
