// adapters/controllers/AuthController.ts
import { Request, Response, Handler } from "express";
import { AuthService } from "../../application/service/AuthService.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { LoginDTO } from "../../application/dto/LoginDTO.js";

const clienteRepository = new ClienteRepository();
const authService = new AuthService(clienteRepository);

export const loginCliente: Handler = async (req: Request, res: Response) => {
  try {
    const loginData: LoginDTO = req.body;
    const token = await authService.login(loginData);

    res.json({
      success: true,
      token,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
