import { Request, Response } from "express";
import { PedidoAluguelService } from "../../application/service/PedidoAluguelService.js";
import { CreatePedidoAluguelDTO } from "../../application/dto/PedidoAluguelDTO.js";
import { UpdatePedidoAluguelDTO } from "../../application/dto/PedidoAluguelDTO.js";
import { PedidoAluguelRepository } from "../repositories/PedidoAluguelRepository.js";

export class PedidoAluguelController {

    static async createPedidoAluguel(req: Request, res: Response) {
        try {
            const pedidoAluguelRepository = new PedidoAluguelRepository();
            const pedidoAluguelService = new PedidoAluguelService(pedidoAluguelRepository);
            const dto: CreatePedidoAluguelDTO = req.body;
            const newPedido = await pedidoAluguelService.createPedidoAluguel(dto);
            res.status(201).json(newPedido);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async getPedidoAluguelById(req: Request, res: Response) {
        try {
            const pedidoAluguelRepository = new PedidoAluguelRepository();
            const pedidoAluguelService = new PedidoAluguelService(pedidoAluguelRepository);
            const { id } = req.params;
            const pedido = await pedidoAluguelService.getPedidoAluguelById(id);
            if (!pedido) return res.status(404).json({ error: "Pedido de aluguel não encontrado" });
            res.json(pedido);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}