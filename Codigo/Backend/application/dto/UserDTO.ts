import { EmpregadoresDTO } from "../dto/EmpregadoresDTO";

export interface CreateUserDTO {
    id: string;
    nome: string;
    email: string;
    senha: string;
    role: "CLIENTE" | "AGENTE";
    profissao?: string;
    tipo?: "BANCO" | "EMPRESA";
    empregadores?: EmpregadoresDTO[];
}