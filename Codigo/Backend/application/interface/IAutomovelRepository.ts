import type { Automovel } from "../model/AutomovelModel";
import type { CreateAutomovelDTO, UpdateAutomovelDTO } from "../dto/AutomovelDTO";

export interface IAutomovelRepository {
    create(automovelData: CreateAutomovelDTO): Promise<Automovel>;
    findAll(): Promise<Automovel[]>;
    findById(id: string): Promise<Automovel | null>;
    update(id: string, automovelData: UpdateAutomovelDTO): Promise<Automovel | null>;
    delete(id: string): Promise<boolean>;
    findDisponiveis(): Promise<Automovel[]>;
}
