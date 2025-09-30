import {Usuario} from './UsuarioModel.js';

export interface AgenteModel extends Usuario {
    role: "AGENTE";
    tipo: "BANCO" | "EMPRESA";
}