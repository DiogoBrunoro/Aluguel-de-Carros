import { IContratoRepository } from "../interface/IContrato.js";
import { Contrato } from "../model/ContratoModel.js";
import { CreateContratoDTO } from "../dto/ContratoDTO.js";
import { UpdateContratoDTO } from "../dto/ContratoDTO.js";

export class ContratoService {
    private contratoRepository: IContratoRepository;

    constructor(contratoRepository: IContratoRepository) {
        this.contratoRepository = contratoRepository;
    }

    async createContrato(dto: CreateContratoDTO) {
        const newContrato: Contrato = {
            id: "", 
            pedido_id: dto.pedido_id,
            cliente_id: dto.cliente_id,
            automovel_id: dto.automovel_id,
            agente_id: dto.agente_id,
            data_inicio: dto.data_inicio,
            data_fim: dto.data_fim,
            valor: dto.valor,
            propriedade: dto.propriedade,
        };
        return this.contratoRepository.createContrato(newContrato);
    }

    async getContratoById(id: string) {
        return this.contratoRepository.getContratoById(id);
    }

    async updateContrato(id: string, dto: UpdateContratoDTO) {
        const existingContrato = await this.contratoRepository.getContratoById(id);
        if (!existingContrato) {
            throw new Error("Contrato não encontrado");
        }
        const updatedContrato: Contrato = {
            ...existingContrato,
            ...dto,
        };
        return this.contratoRepository.updateContrato(updatedContrato);
    }

    async listContratos() {
        return this.contratoRepository.listContratos();
    }
}