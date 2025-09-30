import { useState } from "react";

import ConsultaClientes from "./ConsultaClientes";
import ConsultaCarros from "./ConsultaCarros";
import CadastroCarros from "./CadastroCarros";
import GerenciamentoAluguel from "./GerenciaAlugueis";
import "../styles/PageClient.css";
import HomeDashboard from "../components/HomeDashboard";
import Navbar from "../components/NavBar";
import { TelaAtiva } from "../types/types";

export default function HomePage() {
  const [telaAtiva, setTelaAtiva] = useState<TelaAtiva>("home")

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