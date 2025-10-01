// adapters/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../../application/service/UserService.js";
import { CreateUserDTO } from "../../application/dto/UserDTO.js";

import { UserRepository } from "../repositories/UserRepository.js";
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {

  static async createCliente(req: Request, res: Response) {
    try {
      const dto: CreateUserDTO = {
        ...req.body,
        role: "CLIENTE"
      };
      const cliente = await userService.createUser(dto);
      res.status(201).json(cliente);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const id = req?.user?.id;

      if (!id) {
        return res.status(401).json({ error: "Usuário nao autenticado" });
      }

      const user = await userService.getUserById(id);
      if (!user) return res.status(404).json({ error: "Usuário nao encontrado" });
      res.json(user);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async createAgente(req: Request, res: Response) {
    try {
      const dto: CreateUserDTO = {
        ...req.body,
        role: "AGENTE"
      };
      const agente = await userService.createUser(dto);
      res.status(201).json(agente);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await userService.getUserByEmail(email);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(user);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}
