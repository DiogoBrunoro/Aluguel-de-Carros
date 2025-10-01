import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../midlleware/authMiddleware.js";

const router = Router();

router.post("/clientes", UserController.createCliente);
router.get("/", authMiddleware, UserController.getUserById)
router.post("/agentes", UserController.createAgente);

export default router;
