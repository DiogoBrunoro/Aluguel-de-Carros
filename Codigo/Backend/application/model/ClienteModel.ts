import { Usuario } from "./UsuarioModel";
import { Empregador } from "./EmpregadorModel";

export interface Cliente extends Usuario {
  role: "CLIENTE";
  profissao: string;
  empregadores: Empregador[];
}