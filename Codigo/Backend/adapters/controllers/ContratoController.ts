// Adapters/Controllers/ContratoController.ts
import type { Handler } from "express";
import { ContratoService } from "../../application/service/ContratoService.js";
import { CreateContratoDTO, UpdateContratoDTO } from "../../application/dto/ContratoDTO.js";
import { ContratoRepository } from "../repositories/ContratoRepository.js";

// Dependency Injection
const contratoRepository = new ContratoRepository();
const contratoService = new ContratoService(contratoRepository);

export const criarContrato: Handler = async (req, res) => {
  try {
    const contratoData: CreateContratoDTO = req.body;
    const contrato = await contratoService.criarContrato(contratoData);

    res.status(201).json({
      success: true,
      data: contrato,
      message: "Contrato criado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao criar contrato:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};

export const atualizarContrato: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const contratoData: UpdateContratoDTO = req.body;

    const contratoAtualizado = await contratoService.atualizarContrato(id, contratoData);

    if (!contratoAtualizado) {
      return res.status(404).json({
        success: false,
        error: "Contrato não encontrado",
      });
    }

    res.json({
      success: true,
      data: contratoAtualizado,
      message: "Contrato atualizado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao atualizar contrato:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};

export const buscarContratoPorPedido: Handler = async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const contrato = await contratoService.buscarContratoPorPedido(pedidoId);

    if (!contrato) {
      return res.status(404).json({
        success: false,
        error: "Contrato não encontrado",
      });
    }

    res.json({
      success: true,
      data: contrato,
    });
  } catch (error: any) {
    console.error("Erro ao buscar contrato:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};
