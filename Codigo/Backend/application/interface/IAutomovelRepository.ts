import { Automovel } from "../model/AutomovelModel.js";

export interface IAutomovelRepository {
  createAutomovel(automovel: Automovel): Promise<Automovel>;
  getAutomovelById(id: string): Promise<Automovel | null>;
  updateAutomovel(automovel: Automovel): Promise<Automovel>;
  deleteAutomovel(id: string): Promise<void>;
  listAutomoveis(): Promise<Automovel[]>;
}
