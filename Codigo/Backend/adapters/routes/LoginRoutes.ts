import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authMiddleware } from "../midlleware/authMiddleware.js";

const router = Router();

router.post("/login", AuthController.login);

export default router;
