import type { Contrato } from "../model/ContratoModel.js";
import type { CreateContratoDTO, UpdateContratoDTO } from "../dto/ContratoDTO.js";

export interface IContratoRepository {
    create(contratoData: CreateContratoDTO): Promise<Contrato>;
    findAll(): Promise<Contrato[]>;
    findById(id: string): Promise<Contrato | null>;
    update(id: string, contratoData: UpdateContratoDTO): Promise<Contrato | null>;
    delete(id: string): Promise<boolean>;
    findByPedidoId(pedidoId: string): Promise<Contrato | null>;
}
