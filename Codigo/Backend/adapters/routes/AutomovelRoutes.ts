import express from "express";
import { AutomovelController } from "../controllers/AutomovelController";

const router = express.Router();
const automovelController = new AutomovelController();

router.post("/", (req, res) => automovelController.create(req, res));
router.get("/", (req, res) => automovelController.list(req, res));
router.get("/:id", (req, res) => automovelController.getById(req, res));
router.put("/:id", (req, res) => automovelController.update(req, res));
router.delete("/:id", (req, res) => automovelController.delete(req, res));

export default router;