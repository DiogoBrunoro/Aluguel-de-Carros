import { Contrato } from "../model/ContratoModel";

export interface IContratoRepository {
    createContrato(contrato: Contrato): Promise<Contrato>;
    getContratoById(id: string): Promise<Contrato | null>;
    updateContrato(contrato: Contrato): Promise<Contrato>;
    listContratos(): Promise<Contrato[]>;
}