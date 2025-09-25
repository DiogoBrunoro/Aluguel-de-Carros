import type { PedidoAluguel } from "../model/PedidoAluguelModel";
import type { CreatePedidoDTO, UpdatePedidoDTO } from "../dto/PedidoDTO";

export interface IPedidoRepository {
    create(pedidoData: CreatePedidoDTO): Promise<PedidoAluguel>;
    findAll(): Promise<PedidoAluguel[]>;
    findById(id: string): Promise<PedidoAluguel | null>;
    update(id: string, pedidoData: UpdatePedidoDTO): Promise<PedidoAluguel | null>;
    delete(id: string): Promise<boolean>;
    findByClienteId(clienteId: string): Promise<PedidoAluguel[]>;
}
