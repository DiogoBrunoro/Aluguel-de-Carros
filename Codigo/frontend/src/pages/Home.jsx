// src/pages/HomePage.jsx
"use client";

import { useState } from "react";

import ConsultaClientes from "./ConsultaClientes";
import ConsultaCarros from "./ConsultaCarros";
import CadastroCarros from "./CadastroCarros";
import GerenciamentoAluguel from "./GerenciaAlugueis";

import Navbar from "../components/NavBar"; // Seu componente Navbar
import HomeDashboard from "../components/HomeDashboard"; // Seu componente HomeDashboard

// Importar estilos globais
import "../styles/PageClient.css";

export default function HomePage() {
  const [telaAtiva, setTelaAtiva] = useState("home");

  // Mova a função renderTela PARA DENTRO do componente HomePage
  const renderTelaContent = () => {
    switch (telaAtiva) {
      case "home":
        return <HomeDashboard onNavigate={setTelaAtiva} />;
      case "consulta-clientes":
        return <ConsultaClientes />;
      case "consulta-carros":
        return <ConsultaCarros />;
      case "cadastro-carros":
        return <CadastroCarros />;
      case "gerenciamento-aluguel":
        return <GerenciamentoAluguel />;
      default:
        return <HomeDashboard onNavigate={setTelaAtiva} />;
    }
  };

  return (
    <div>
      <Navbar setTelaAtiva={setTelaAtiva} telaAtiva={telaAtiva} />
      {renderTelaContent()}
    </div>
  );
}