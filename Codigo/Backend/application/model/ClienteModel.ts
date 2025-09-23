export interface Cliente {
  id: string
  nome: string
  rg: string
  cpf: string
  endereco: string
  profissao?: string
  rendimentos: number[] 
  empregadores: string[]
  createdAt?: Date
  updatedAt?: Date
}

