import type { Automovel } from "../model/AutomovelModel";
import type { CreateAutomovelDTO, UpdateAutomovelDTO } from "../dto/AutomovelDTO";
import { IAutomovelRepository } from "../interface/IAutomovelRepository";
import crypto from "crypto";

export class AutomovelService {
    constructor(private automovelRepository: IAutomovelRepository) {}

    async criarAutomovel(data: CreateAutomovelDTO): Promise<Automovel> {
        const automovel: Automovel = {
            id: crypto.randomUUID(),
            marca: data.marca,
            modelo: data.modelo,
            ano: data.ano,
            matricula: data.matricula,
            placa: data.placa,
            disponivel: data.disponivel ?? true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return this.automovelRepository.create(automovel);
    }

    async atualizarAutomovel(id: string, data: UpdateAutomovelDTO): Promise<Automovel | null> {
        const existente = await this.automovelRepository.findById(id);
        if (!existente) return null;

        const atualizado: Automovel = {
            ...existente,
            ...data,
            updatedAt: new Date(),
        };

        return this.automovelRepository.update(id, atualizado);
    }

    async listarAutomoveisDisponiveis(): Promise<Automovel[]> {
        const todos = await this.automovelRepository.findAll();
        return todos.filter(a => a.disponivel);
    }

    async buscarAutomovelPorId(id: string): Promise<Automovel | null> {
        return this.automovelRepository.findById(id);
    }
}
