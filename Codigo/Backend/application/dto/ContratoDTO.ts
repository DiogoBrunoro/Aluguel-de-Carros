export interface CreateContratoDTO {
    pedidoId: string;          
    clienteId: string;
    automovelId: string;
    agenteId: string;          
    dataInicio: Date;
    dataFim: Date;
    valor: number;
    propriedade: "CLIENTE" | "EMPRESA" | "BANCO";
}

export interface UpdateContratoDTO {
    dataInicio?: Date;
    dataFim?: Date;
    valor?: number;
    propriedade?: "CLIENTE" | "EMPRESA" | "BANCO";
}