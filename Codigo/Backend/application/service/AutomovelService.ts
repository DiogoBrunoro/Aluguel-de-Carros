import { CreateAutomovelDTO } from "../dto/AutomovelDTO.js";
import { IAutomovelRepository } from "../interface/IAutomovelRepository.js";
import { Automovel } from "../model/AutomovelModel.js";
import { v4 as uuidv4 } from "uuid";

export class AutomovelService {
  private automovelRepository: IAutomovelRepository;

  constructor(automovelRepository: IAutomovelRepository) {
    this.automovelRepository = automovelRepository;
  }

  async createAutomovel(dto: CreateAutomovelDTO) {
    const id = uuidv4();
    const newAutomovel: Automovel = {
      id,
      marca: dto.marca,
      modelo: dto.modelo,
      ano: dto.ano,
      matricula: dto.matricula,
      placa: dto.placa,
      disponivel: dto.disponivel ?? true,
    };
    return this.automovelRepository.createAutomovel(newAutomovel);
  }

  async getAutomovelById(id: string) {
    return this.automovelRepository.getAutomovelById(id);
  }

  async updateAutomovel(id: string, dto: Partial<CreateAutomovelDTO>) {
    const existingAutomovel = await this.automovelRepository.getAutomovelById(
      id
    );
    if (!existingAutomovel) {
      throw new Error("Automóvel não encontrado");
    }
    const updatedAutomovel: Automovel = {
      ...existingAutomovel,
      ...dto,
    };
    return this.automovelRepository.updateAutomovel(updatedAutomovel);
  }

  async deleteAutomovel(id: string) {
    return this.automovelRepository.deleteAutomovel(id);
  }

  async listAutomoveis(id: string) {
    return this.automovelRepository.listAutomoveis(id);
  }
}
