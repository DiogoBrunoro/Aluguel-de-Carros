

export interface PedidoAluguel {
    id: string;
    clienteId: string;
    automovelId: string;
    dataInicio: string;
    dataFim: string;
    valorEstimado?: number;
    status: "PENDENTE" | "EM_ANALISE" | "APROVADO" | "REPROVADO" | "CANCELADO";
    createdAt?: Date;
    updatedAt?: Date;
  }
  