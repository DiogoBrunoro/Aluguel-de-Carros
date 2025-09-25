// routes/automovelRoutes.ts
import express from "express";
import { criarAutomovel, listarAutomoveisDisponiveis, atualizarAutomovel } from "../controllers/AutomovelController";

const AutomovelRouter = express.Router();

// Rotas para Automóveis
AutomovelRouter.post("/automoveis", criarAutomovel);
AutomovelRouter.get("/automoveis/disponiveis", listarAutomoveisDisponiveis); // Rota específica para listar apenas disponíveis
// Se você tiver uma função para listar todos os automóveis, pode adicionar:
// AutomovelRouter.get("/automoveis", listarTodosAutomoveis);
AutomovelRouter.put("/automoveis/:id", atualizarAutomovel);
// Se você tiver funções para buscar por ID ou excluir, adicione-as aqui:
// AutomovelRouter.get("/automoveis/:id", buscarAutomovel);
// AutomovelRouter.delete("/automoveis/:id", excluirAutomovel);


export default AutomovelRouter;