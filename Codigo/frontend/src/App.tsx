import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PageCliente from "./pages/PageCliente";
import ConsultaClientes from "./pages/ConsultaClientes";
import ConsultaCarros from "./pages/ConsultaCarros";
import GerenciamentoAluguel from "./pages/GerenciaAlugueis";
import HomePage from "./pages/Home";
import CadastroCarros from "./pages/CadastroCarros";
import { useEffect } from "react";
import RegisterScreen from "./pages/CadastroCliente";
import LoginScreen from "./pages/Login";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<PageCliente />} />
          <Route path="/clientes/novo" element={<RegisterScreen />} />
          <Route path="/clientes/pesquisar" element={<ConsultaClientes />} />
          <Route path="/carros/pesquisar" element={<ConsultaCarros />} />
          <Route path="/carros/novo" element={<CadastroCarros />} />
          <Route path="/carros/gerencia" element={<GerenciamentoAluguel />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
