// Adapters/Controllers/ContratoController.ts
import type { Handler } from "express";
import { ContratoService } from "../../application/service/ContratoService.js";
import { CreateContratoDTO, UpdateContratoDTO } from "../../application/dto/ContratoDTO.js";
import { ContratoRepository } from "../repositories/ContratoRepository.js";


const contratoRepository = new ContratoRepository();
const contratoService = new ContratoService(contratoRepository);

export class ContratoController {

    static createContrato: Handler = async (req, res) => {
        try {
            const dto: CreateContratoDTO = req.body;
            const newContrato = await contratoService.createContrato(dto);
            res.status(201).json(newContrato);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    };

    static getContratoById: Handler = async (req, res) => {
        try {
            const { id } = req.params;
            const contrato = await contratoService.getContratoById(id);
            if (!contrato) return res.status(404).json({ error: "Contrato não encontrado" });
            res.json(contrato);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    };

    static updateContrato: Handler = async (req, res) => {
        try {
            const { id } = req.params;
            const dto: UpdateContratoDTO = req.body;
            const updatedContrato = await contratoService.updateContrato(id, dto);
            res.json(updatedContrato);
        } catch (err: any) {
            console.error(err);
            if (err.message === "Contrato não encontrado") {
                return res.status(404).json({ error: err.message });
            }
            res.status(500).json({ error: err.message });
        }
    };

    static listContratos: Handler = async (req, res) => {
        try {
            const contratos = await contratoService.listContratos();
            res.json(contratos);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    };
}