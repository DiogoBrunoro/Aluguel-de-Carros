import type { PedidoAluguel } from "../model/PedidoAluguelModel.js";
import type { CreatePedidoDTO, UpdatePedidoDTO } from "../dto/PedidoDTO.js";

export interface IPedidoRepository {
    create(pedidoData: CreatePedidoDTO): Promise<PedidoAluguel>;
    findAll(): Promise<PedidoAluguel[]>;
    findById(id: string): Promise<PedidoAluguel | null>;
    update(id: string, pedidoData: UpdatePedidoDTO): Promise<PedidoAluguel | null>;
    delete(id: string): Promise<boolean>;
    findByClienteId(clienteId: string): Promise<PedidoAluguel[]>;
}
