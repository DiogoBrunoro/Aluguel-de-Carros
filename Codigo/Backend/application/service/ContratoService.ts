import type { Contrato } from "../model/ContratoModel.js";
import type { CreateContratoDTO, UpdateContratoDTO } from "../dto/ContratoDTO.js";
import { IContratoRepository } from "../interface/IContratoRepository.js";
import crypto from "crypto";

export class ContratoService {
    constructor(private contratoRepository: IContratoRepository) {}

    async criarContrato(data: CreateContratoDTO): Promise<Contrato> {
        const contrato: Contrato = {
            id: crypto.randomUUID(),
            pedidoId: data.pedidoId,
            tipoPropriedade: data.tipoPropriedade,
            creditoBancario: data.creditoBancario,
            status: "PENDENTE",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return this.contratoRepository.create(contrato);
    }

    async atualizarContrato(id: string, data: UpdateContratoDTO): Promise<Contrato | null> {
        const existente = await this.contratoRepository.findById(id);
        if (!existente) return null;

        const atualizado: Contrato = {
            ...existente,
            ...data,
            updatedAt: new Date(),
        };

        return this.contratoRepository.update(id, atualizado);
    }

    async buscarContratoPorPedido(pedidoId: string): Promise<Contrato | null> {
        return this.contratoRepository.findByPedidoId(pedidoId);
    }
}
