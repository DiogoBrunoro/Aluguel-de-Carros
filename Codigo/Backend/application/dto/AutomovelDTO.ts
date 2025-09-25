
export interface CreateAutomovelDTO {
    marca: string;
    modelo: string;
    ano: number;
    matricula: string;
    placa: string;
    disponivel?: boolean;
  }
  
  export interface UpdateAutomovelDTO {
    marca?: string;
    modelo?: string;
    ano?: number;
    matricula?: string;
    placa?: string;
    disponivel?: boolean;
  }
  