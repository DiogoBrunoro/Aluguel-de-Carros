import { Router } from "express";
import { PedidoAluguelController } from "../controllers/PedidoAluguelController.js";
import { authMiddleware } from "../midlleware/authMiddleware.js";

const router = Router();

router.post("/",authMiddleware, PedidoAluguelController.createPedidoAluguel);
router.get("/",authMiddleware, PedidoAluguelController.listPedidosAluguel);
router.get("/pedidos",authMiddleware, PedidoAluguelController.listAllPedidosAluguel);
router.put("/:id",authMiddleware, PedidoAluguelController.updatePedidoAluguel);
router.get("/PedidoAluguel/:id",authMiddleware, PedidoAluguelController.getPedidoAluguelById);


export default router;