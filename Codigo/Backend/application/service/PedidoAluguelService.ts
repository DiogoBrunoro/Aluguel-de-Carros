import { IPedidoAluguelRepository } from "../interface/IPedidoAluguel.js";
import { PedidoAluguel } from "../model/PedidoAluguelModel.js";
import { v4 as uuidv4 } from "uuid";
import { CreatePedidoAluguelDTO } from "../dto/PedidoAluguelDTO.js";
import { UpdatePedidoAluguelDTO } from "../dto/PedidoAluguelDTO.js";

export class PedidoAluguelService {

    private pedidoAluguelRepository: IPedidoAluguelRepository;
    
    constructor(pedidoAluguelRepository: IPedidoAluguelRepository) {
        this.pedidoAluguelRepository = pedidoAluguelRepository;
    }
    
    async createPedidoAluguel(dto: CreatePedidoAluguelDTO) {
        const id = uuidv4();
        const newPedido: PedidoAluguel = {
        id,
        clienteId: dto.clienteId,
        automovelId: dto.automovelId,
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim,
        valor: dto.valor,
        status: "PENDENTE",
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
    
    async listPedidosAluguel() {
        return this.pedidoAluguelRepository.listPedidosAluguel();
    }
}