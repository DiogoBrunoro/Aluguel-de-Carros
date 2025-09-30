import { Router } from "express";
import { PedidoAluguelController } from "../controllers/PedidoAluguelController.js";

const router = Router();

router.post("/PedidoAluguel", PedidoAluguelController.createPedidoAluguel);
router.get("/PedidoAluguel/:id", PedidoAluguelController.getPedidoAluguelById);


export default router;