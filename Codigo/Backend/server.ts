import express from "express";
import dotenv from "dotenv";
import userRoutes from "../Backend/adapters/routes/UserRoutes"; 
import loginRoutes from "../Backend/adapters/routes/LoginRoutes";
import automovelRoutes from "../Backend/adapters/routes/AutomovelRoutes";

dotenv.config();

const app = express();

app.use(express.json()); 
app.use("/api/users", userRoutes);
app.use("/api/users", loginRoutes); 
app.use("/api/automoveis",automovelRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
