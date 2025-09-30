export interface PedidoAluguel {
    id: string;
    clienteId: string;        
    automovelId: string;      
    dataInicio: Date;
    dataFim: Date;
    status: "PENDENTE" | "APROVADO" | "REJEITADO" | "CANCELADO";
    valor: number;
}