// application/service/AuthService.ts
import { IClienteRepository } from "../interface/IClienteRepository";
import { LoginDTO } from "../dto/LoginDTO";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private clienteRepository: IClienteRepository) {}

  async login(loginData: LoginDTO): Promise<string> {
    const cliente = await this.clienteRepository.findByCpf(loginData.cpf);

    if (!cliente || !cliente.senha) {
      throw new Error("CPF ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(loginData.senha, cliente.senha);

    if (!senhaValida) {
      throw new Error("CPF ou senha inválidos");
    }

    // Aqui você poderia gerar um token JWT, por exemplo:
    const token = this.gerarToken(cliente.id);
    return token;
  }

  private gerarToken(clienteId: string): string {
    // JWT simples (exemplo, use segredo em .env)
    const jwt = require("jsonwebtoken");
    return jwt.sign({ id: clienteId }, process.env.JWT_SECRET || "segredo", {
      expiresIn: "1h",
    });
  }
}
