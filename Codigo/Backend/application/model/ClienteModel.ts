import { Usuario } from "./UsuarioModel.js";
import { Empregador } from "./EmpregadorModel.js";

export interface Cliente extends Usuario {
  role: "CLIENTE";
  profissao: string;
  empregadores: Empregador[];
}