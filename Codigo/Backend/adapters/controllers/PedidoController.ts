// Adapters/Controllers/PedidoController.ts
import type { Handler } from "express";
import { PedidoService } from "../../application/service/PedidoService.js";
import { CreatePedidoDTO, UpdatePedidoDTO } from "../../application/dto/PedidoDTO.js";
import { PedidoRepository } from "../repositories/PedidoRepository.js";

// Dependency Injection
const pedidoRepository = new PedidoRepository();
const pedidoService = new PedidoService(pedidoRepository);

export const criarPedido: Handler = async (req, res) => {
  try {
    const pedidoData: CreatePedidoDTO = req.body;
    const pedido = await pedidoService.criarPedido(pedidoData);

    res.status(201).json({
      success: true,
      data: pedido,
      message: "Pedido criado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao criar pedido:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};

export const listarPedidosPorCliente: Handler = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const pedidos = await pedidoService.consultarPedidosPorCliente(clienteId);

    res.json({
      success: true,
      data: pedidos,
      total: pedidos.length,
    });
  } catch (error: any) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};

export const atualizarPedido: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoData: UpdatePedidoDTO = req.body;
    const pedidoAtualizado = await pedidoService.atualizarPedido(id, pedidoData);

    if (!pedidoAtualizado) {
      return res.status(404).json({
        success: false,
        error: "Pedido não encontrado",
      });
    }

    res.json({
      success: true,
      data: pedidoAtualizado,
      message: "Pedido atualizado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};

export const cancelarPedido: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoCancelado = await pedidoService.cancelarPedido(id);

    if (!pedidoCancelado) {
      return res.status(404).json({
        success: false,
        error: "Pedido não encontrado",
      });
    }

    res.json({
      success: true,
      data: pedidoCancelado,
      message: "Pedido cancelado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao cancelar pedido:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};
