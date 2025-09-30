import { Request, Response } from "express";
import { AutomovelRepository } from "../repositories/AutomovelRepository";
import { v4 as uuidv4 } from 'uuid';

const automovelRepository = new AutomovelRepository();

export class AutomovelController {
  async create(req: Request, res: Response) {
    try {
      const { marca, modelo, ano, matricula, placa } = req.body;
      const automovel = await automovelRepository.createAutomovel({
        id: uuidv4(),
        marca,
        modelo,
        ano,
        matricula,
        placa,
        disponivel: true
      });
      res.status(201).json(automovel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const automoveis = await automovelRepository.listAutomoveis();
    res.json(automoveis);
  }

  async getById(req: Request, res: Response) {
    const automovel = await automovelRepository.getAutomovelById(req.params.id);
    if (!automovel) {
      return res.status(404).json({ error: "Automóvel não encontrado" });
    }
    res.json(automovel);
  }

  async update(req: Request, res: Response) {
    try {
      const automovel = await automovelRepository.updateAutomovel({
        id: req.params.id,
        ...req.body
      });
      res.json(automovel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    await automovelRepository.deleteAutomovel(req.params.id);
    res.status(204).send();
  }
}
