import { PedidoAluguel } from "../model/PedidoAluguelModel";

export interface IPedidoAluguelRepository {
    
    createPedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel>;
    getPedidoAluguelById(id: string): Promise<PedidoAluguel | null>;
    updatePedidoAluguel(pedido: PedidoAluguel): Promise<PedidoAluguel>;
    listPedidosAluguel(): Promise<PedidoAluguel[]>;
}