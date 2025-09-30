import express from "express";
import { AutomovelController } from "../controllers/AutomovelController.js";
import { authMiddleware } from "../midlleware/authMiddleware.js";

const router = express.Router();
const automovelController = new AutomovelController();

router.post("/", authMiddleware, (req, res) => automovelController.create(req, res));
router.get("/", authMiddleware,(req, res) => automovelController.list(req, res));
router.get("/:id",authMiddleware, (req, res) => automovelController.getById(req, res));
router.put("/:id",authMiddleware, (req, res) => automovelController.update(req, res));
router.delete("/:id",authMiddleware, (req, res) => automovelController.delete(req, res));

export default router;