export interface Contrato {
    id: string;
    pedidoId: string;          
    clienteId: string;
    automovelId: string;
    agenteId: string;          
    dataInicio: Date;
    dataFim: Date;
    valor: number;
    propriedade: "CLIENTE" | "EMPRESA" | "BANCO";
  }
  