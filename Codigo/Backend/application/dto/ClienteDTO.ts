export interface CreateClienteDTO {
  nome: string;
  rg: string;
  cpf: string;
  endereco: string;
  profissao?: string;
  rendimentos: number[];
  empregadores: string[];
  senha: string;
}

export interface UpdateClienteDTO {
  nome?: string;
  rg?: string;
  cpf?: string;
  endereco?: string;
  profissao?: string;
  rendimentos?: number[];
  empregadores?: string[];
  senha?: string; 
}
