
export interface CreatePedidoDTO {
    clienteId: string;
    automovelId: string;
    dataInicio: string; 
    dataFim: string;    
    valorEstimado?: number;
  }
  
  export interface UpdatePedidoDTO {
    automovelId?: string;
    dataInicio?: string;
    dataFim?: string;
    valorEstimado?: number;
    status?: "PENDENTE" | "EM_ANALISE" | "APROVADO" | "REPROVADO" | "CANCELADO";
  }
  