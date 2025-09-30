import { Router } from "express";
import { PedidoAluguelController } from "../controllers/PedidoAluguelController.js";
import { authMiddleware } from "../midlleware/authMiddleware.js";

const router = Router();

router.post("/PedidoAluguel",authMiddleware, PedidoAluguelController.createPedidoAluguel);
router.get("/PedidoAluguel/:id",authMiddleware, PedidoAluguelController.getPedidoAluguelById);


export default router;