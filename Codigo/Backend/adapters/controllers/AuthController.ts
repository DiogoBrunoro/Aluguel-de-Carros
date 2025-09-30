import { Request, Response } from "express";
import { AuthService } from "../../application/service/AuthService";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const result = await authService.login({ email, senha });
      return res.json(result);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
}
