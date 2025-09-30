// Adapters/Controllers/AutomovelController.ts
import type { Handler } from "express";
import { AutomovelService } from "../../application/service/AutomovelService.js";
import { CreateAutomovelDTO, UpdateAutomovelDTO } from "../../application/dto/AutomovelDTO.js";
import { AutomovelRepository } from "../repositories/AutomovelRepository.js";

// Dependency Injection
const automovelRepository = new AutomovelRepository();
const automovelService = new AutomovelService(automovelRepository);

export const criarAutomovel: Handler = async (req, res) => {
  try {
    const automovelData: CreateAutomovelDTO = req.body;
    const automovel = await automovelService.criarAutomovel(automovelData);

    res.status(201).json({
      success: true,
      data: automovel,
      message: "Automóvel criado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao criar automóvel:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};

export const listarAutomoveisDisponiveis: Handler = async (req, res) => {
  try {
    const automoveis = await automovelService.listarAutomoveisDisponiveis();

    res.json({
      success: true,
      data: automoveis,
      total: automoveis.length,
    });
  } catch (error: any) {
    console.error("Erro ao listar automóveis:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};

export const atualizarAutomovel: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const automovelData: UpdateAutomovelDTO = req.body;

    const automovelAtualizado = await automovelService.atualizarAutomovel(id, automovelData);

    if (!automovelAtualizado) {
      return res.status(404).json({
        success: false,
        error: "Automóvel não encontrado",
      });
    }

    res.json({
      success: true,
      data: automovelAtualizado,
      message: "Automóvel atualizado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao atualizar automóvel:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    });
  }
};
