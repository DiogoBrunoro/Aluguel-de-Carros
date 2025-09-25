
export interface CreateContratoDTO {
    pedidoId: string;
    tipoPropriedade: "CLIENTE" | "EMPRESA" | "BANCO";
    creditoBancario?: string;
  }
  
  export interface UpdateContratoDTO {
    tipoPropriedade?: "CLIENTE" | "EMPRESA" | "BANCO";
    creditoBancario?: string;
    status?: "PENDENTE" | "ASSOCIADO" | "FINALIZADO";
  }
  