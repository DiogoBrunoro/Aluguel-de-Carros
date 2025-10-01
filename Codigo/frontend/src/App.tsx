import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PageCliente from "./pages/PageCliente";
import ConsultaClientes from "./pages/Agente/ConsultaClientes";
import ConsultaCarros from "./pages/Agente/ConsultaCarros";
import GerenciamentoAluguel from "./pages/Agente/GerenciaAlugueis";
import HomePage from "./pages/Home";
import CadastroCarros from "./pages/Agente/CadastroCarros";
import { useEffect } from "react";
import RegisterScreen from "./pages/CadastroCliente";
import LoginScreen from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ClienteDashboard from "./pages/Cliente/ClienteDashboard";
import AgenteDashboard from "./pages/Agente/AgenteDashboard";

export default function App() {
  useEffect(() => {
    const video = document.getElementById("bg-video");
    if (video) {
      // video.playbackRate = 1.0; 
    }
  }, []);

  return (
    <BrowserRouter>
      <video autoPlay muted loop playsInline id="bg-video">
        <source src="/videos/Fundo.mp4" type="video/mp4" />
      </video>

      <div className="bg-animated">
        <Routes>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<LoginScreen />} />
          <Route path="/cadastro" element={<RegisterScreen />} />

          {/* Rotas protegidas para CLIENTES */}
          <Route element={<PrivateRoute allowedRoles={["CLIENTE"]} />}>
            <Route path="/cliente" element={<ClienteDashboard />} />
          </Route>

          {/* Rotas protegidas para AGENTES */}
          <Route element={<PrivateRoute allowedRoles={["AGENTE"]} />}>
            <Route path="/agente" element={<AgenteDashboard />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<HomePage />}></Route>
            <Route path="/clientes" element={<PageCliente />} />
            <Route path="/clientes/pesquisar" element={<ConsultaClientes />} />
            <Route path="/carros/pesquisar" element={<ConsultaCarros />} />
            <Route path="/carros/novo" element={<CadastroCarros />} />
            <Route path="/carros/gerencia" element={<GerenciamentoAluguel />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
