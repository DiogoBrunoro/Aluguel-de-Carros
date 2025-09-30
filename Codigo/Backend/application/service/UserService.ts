import { CreateUserDTO } from "../dto/UserDTO.js";
import { IUserRepository } from "../interface/IUserRepository.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { AgenteModel } from "../model/AgenteModel.js";
import { Cliente } from "../model/ClienteModel.js";

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }


    async getUserByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async createUser(dto: CreateUserDTO) {
        const hashedPassword = await bcrypt.hash(dto.senha, 10);
        const id = uuidv4();
      
        if(dto.role === "AGENTE") {
          const agente: AgenteModel = {
            id,
            nome: dto.nome,
            email: dto.email,
            senha: hashedPassword,
            role: "AGENTE",
            tipo: dto.tipo!
          };
          return this.userRepository.createUserAgente(agente);
        } 
        if(dto.role === "CLIENTE") {
            const cliente: Cliente = {
              id,
              nome: dto.nome,
              email: dto.email,
              senha: hashedPassword,
              role: "CLIENTE",
              profissao: dto.profissao!,
              empregadores: (dto.empregadores || []).map(e => ({
                id: uuidv4(),
                nome: e.nome,
                rendimentoMensal: e.rendimentoMensal
              }))
            };
            return this.userRepository.createUserCliente(cliente);
          }
          
      }
      
}