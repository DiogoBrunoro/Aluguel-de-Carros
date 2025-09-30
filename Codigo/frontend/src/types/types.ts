export interface Cliente {
  id: string
  nome: string
  cpf: string
  rg: string
  endereco: string
  profissao?: string
  rendimentos?: number[]
  empregadores?: string[]
  senha?: string
}

export interface Carro {
  id: string
  marca: string
  modelo: string
  ano: number
  matricula: string
  placa: string
}

export type StatusAluguel = "ativo" | "pendente" | "cancelado" | "finalizado"

export interface Aluguel {
  id: string
  clienteId: string
  carroId: string
  dataInicio: string
  dataFim: string
  valorDiario: string
  status: StatusAluguel
}

export type TelaAtiva = "home" | "consulta-clientes" | "consulta-carros" | "cadastro-carros" | "gerenciamento-aluguel"

export interface MessageState {
  type: "success" | "error" | ""
  text: string
}
