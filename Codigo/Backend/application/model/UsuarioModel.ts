import { Empregador } from "./EmpregadorModel.js";

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    role: "CLIENTE" | "AGENTE";
  }
  