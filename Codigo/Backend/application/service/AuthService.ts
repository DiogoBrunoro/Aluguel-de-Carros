import { LoginDTO } from "../dto/LoginDTO.js";
import { IUserRepository } from "../interface/IUserRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(dto: LoginDTO): Promise<{ token: string; role: string }> {
    const user = await this.userRepository.findByEmail(dto.email);

    console.log(user);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }
    const validPassword = await bcrypt.compare(dto.senha, user.senha);

  if (!validPassword) {
  throw new Error("Credenciais inválidas");
}

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "chave_super_secreta",
      { expiresIn: "1h" }
    );

    return { token, role: user.role };
  }
}
