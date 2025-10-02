export interface CreateContratoDTO {
    pedido_id: string;          
    cliente_id: string;
    automovel_id: string;
    agente_id: string;          
    data_inicio: Date;
    data_fim: Date;
    valor: number;
    propriedade: "CLIENTE" | "EMPRESA" | "BANCO";
}

export interface UpdateContratoDTO {
    data_inicio?: Date;
    data_fim?: Date;
    valor?: number;
    propriedade?: "CLIENTE" | "EMPRESA" | "BANCO";
}