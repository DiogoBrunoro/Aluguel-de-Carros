import { Usuario } from "../model/UsuarioModel";

export interface IUserRepository {
    createUser(user: Usuario): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario | null>;
}