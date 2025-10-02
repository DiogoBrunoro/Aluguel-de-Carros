import { listarPedidoAluguelDTO } from "../dto/PedidoAluguelDTO.js";
import { PedidoAluguel } from "../model/PedidoAluguelModel.js";

export interface IPedidoAluguelRepository {

    createPedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel>;
    getPedidoAluguelById(id: string): Promise<PedidoAluguel | null>;
    updatePedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel>;
    listPedidosAluguel(client_id: string): Promise<listarPedidoAluguelDTO[]>;
    listAllPedidosAluguel(): Promise<listarPedidoAluguelDTO[]>;
}