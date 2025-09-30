import { LoginDTO } from "../dto/LoginDTO";
import { IUserRepository } from "../interface/IUserRepository";
import jwt from "jsonwebtoken";


export class AuthService{
    private userRepository: IUserRepository;

constructor(userRepository: IUserRepository){
    this.userRepository = userRepository;
}

async login(dto: LoginDTO): Promise<{ token: string; role: string }> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user || user.senha !== dto.senha) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "chavesecreta",
      { expiresIn: "1h" }
    );

    return { token, role: user.role };
  }

}
