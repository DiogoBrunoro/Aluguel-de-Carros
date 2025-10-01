export interface PedidoAluguel {
    id?: string;
    clienteId: string;        
    automovelId: string;      
    data_inicio: Date;
    data_fim: Date;
    status: "pendente" | "aprovado" | "rejeitado" | "cancelado";
    valor_diario: number;
}


export interface UpdatePedidoAluguelDTO {
    dataInicio?: Date;
    dataFim?: Date;
    status?: "PENDENTE" | "APROVADO" | "REJEITADO" | "CANCELADO";
    valor?: number; // Corresponde a valor_diario na DB
}