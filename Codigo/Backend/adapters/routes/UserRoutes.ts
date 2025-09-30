import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.post("/clientes", UserController.createCliente);

router.post("/agentes", UserController.createAgente);

export default router;
