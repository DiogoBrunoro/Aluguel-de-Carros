import { Usuario } from "../model/UsuarioModel.js";

export interface IUserRepository {
    createUserAgente(user: Usuario): Promise<Usuario>;
    createUserCliente(user: Usuario): Promise<Usuario>
    findByEmail(email: string): Promise<Usuario | null>;
}