export interface CreatePedidoAluguelDTO {
    clienteId: string;        
    automovelId: string;      
    dataInicio: Date;
    dataFim: Date;
    valor: number;
}

export interface UpdatePedidoAluguelDTO {
    dataInicio?: Date;
    dataFim?: Date;
    status?: "PENDENTE" | "APROVADO" | "REJEITADO" | "CANCELADO";
    valor?: number;
}