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
        cliente_id: dto.cliente_id,
        automovel_id: dto.automovel_id,
        data_inicio: dto.data_inicio,
        data_fim: dto.data_fim,
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
        return this.pedidoAluguelRepository.updatePedidoAluguel(updatedPedido);
    }
    
    async listPedidosAluguel(id: string) {
        return this.pedidoAluguelRepository.listPedidosAluguel(id);
    }
}