export interface Contrato {
    id: string;
    pedidoId: string;
    tipoPropriedade: "CLIENTE" | "EMPRESA" | "BANCO";
    creditoBancario?: string;
    status: "PENDENTE" | "ASSOCIADO" | "FINALIZADO";
    createdAt?: Date;
    updatedAt?: Date;
  }
  