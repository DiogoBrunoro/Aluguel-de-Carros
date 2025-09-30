import { Empregador } from "./EmpregadorModel";

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    role: "CLIENTE" | "AGENTE";
  }
  