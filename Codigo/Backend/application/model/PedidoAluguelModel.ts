export interface PedidoAluguel {
    id?: string;
    cliente_id: string;        
    automovel_id: string;      
    data_inicio: Date;
    data_fim: Date;
    status: "pendente" | "aprovado" | "rejeitado" | "cancelado";
    valor_diario: number;
}


export interface UpdatePedidoAluguelDTO {
    data_inicio?: Date;
    data_fim?: Date;
    status?: "PENDENTE" | "APROVADO" | "REJEITADO" | "CANCELADO";
    valor?: number; // Corresponde a valor_diario na DB
}