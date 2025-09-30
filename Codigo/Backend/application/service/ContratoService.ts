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
            pedidoId: dto.pedidoId,
            clienteId: dto.clienteId,
            automovelId: dto.automovelId,
            agenteId: dto.agenteId,
            dataInicio: dto.dataInicio,
            dataFim: dto.dataFim,
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