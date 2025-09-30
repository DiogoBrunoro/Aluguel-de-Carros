import express from "express";
import dotenv from "dotenv";
import userRoutes from "../Backend/adapters/routes/UserRoutes"; 
import loginRoutes from "../Backend/adapters/routes/LoginRoutes";

dotenv.config();

const app = express();

app.use(express.json()); 
app.use("/api/users", userRoutes);
app.use("/api/users", loginRoutes); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`));
