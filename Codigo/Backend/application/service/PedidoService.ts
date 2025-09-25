import type { PedidoAluguel } from "../model/PedidoAluguelModel";
import type { CreatePedidoDTO, UpdatePedidoDTO } from "../dto/PedidoDTO";
import { IPedidoRepository } from "../interface/IPedidoRepository";
import crypto from "crypto";

export class PedidoService {
    constructor(private pedidoRepository: IPedidoRepository) {}

    async criarPedido(pedidoData: CreatePedidoDTO): Promise<PedidoAluguel> {
        // Validações básicas
        this.validarDatas(pedidoData.dataInicio, pedidoData.dataFim);

        const pedido: PedidoAluguel = {
            id: crypto.randomUUID(),
            clienteId: pedidoData.clienteId,
            automovelId: pedidoData.automovelId,
            dataInicio: pedidoData.dataInicio,
            dataFim: pedidoData.dataFim,
            valorEstimado: pedidoData.valorEstimado,
            status: "PENDENTE",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return await this.pedidoRepository.create(pedido);
    }

    async atualizarPedido(id: string, pedidoData: UpdatePedidoDTO): Promise<PedidoAluguel | null> {
        const pedidoExistente = await this.pedidoRepository.findById(id);
        if (!pedidoExistente) return null;

        if (pedidoData.dataInicio || pedidoData.dataFim) {
            this.validarDatas(
                pedidoData.dataInicio ?? pedidoExistente.dataInicio,
                pedidoData.dataFim ?? pedidoExistente.dataFim
            );
        }

        const atualizado: PedidoAluguel = {
            ...pedidoExistente,
            ...pedidoData,
            updatedAt: new Date(),
        };

        return this.pedidoRepository.update(id, atualizado);
    }

    async cancelarPedido(id: string): Promise<PedidoAluguel | null> {
        return this.atualizarPedido(id, { status: "CANCELADO" });
    }

    async consultarPedidosPorCliente(clienteId: string): Promise<PedidoAluguel[]> {
        return this.pedidoRepository.findByClienteId(clienteId);
    }

    private validarDatas(inicio: string, fim: string) {
        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);
        if (dataFim < dataInicio) throw new Error("Data de fim não pode ser anterior à data de início");
    }
}
