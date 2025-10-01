import { IPedidoAluguelRepository } from "../interface/IPedidoAluguel.js";
import { PedidoAluguel } from "../model/PedidoAluguelModel.js";
import { CreatePedidoAluguelDTO } from "../dto/PedidoAluguelDTO.js";
import { UpdatePedidoAluguelDTO } from "../dto/PedidoAluguelDTO.js";

export class PedidoAluguelService {

    private pedidoAluguelRepository: IPedidoAluguelRepository;
    
    constructor(pedidoAluguelRepository: IPedidoAluguelRepository) {
        this.pedidoAluguelRepository = pedidoAluguelRepository;
    }
    
    async createPedidoAluguel(dto: CreatePedidoAluguelDTO) {
        const newPedido: PedidoAluguel = {
        clienteId: dto.clienteId,
        automovelId: dto.automovelId,
        data_inicio: dto.dataInicio,
        data_fim: dto.dataFim,
        valor_diario: dto.valor,
        status: "pendente",
        };
        return this.pedidoAluguelRepository.createPedidoAluguel(newPedido);
    }
    
    async getPedidoAluguelById(id: string) {
        return this.pedidoAluguelRepository.getPedidoAluguelById(id);
    }
    
    async updatePedidoAluguel(
        id: string,
        dto:UpdatePedidoAluguelDTO
    ) {
        const existingPedido =
        await this.pedidoAluguelRepository.getPedidoAluguelById(id);
        if (!existingPedido) {
        throw new Error("Pedido de aluguel não encontrado");
        }
        const updatedPedido: PedidoAluguel = {
        ...existingPedido,
        ...dto,
        };
        console.log(updatedPedido)
        return this.pedidoAluguelRepository.updatePedidoAluguel(updatedPedido);
    }
    
    async listPedidosAluguel(id: string) {
        return this.pedidoAluguelRepository.listPedidosAluguel(id);
    }
}