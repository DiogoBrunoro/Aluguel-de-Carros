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
import { PrivateRoute } from "./components/PrivateRoute";
import TesteRole from "./pages/TesteRole";
import TesteRole2 from "./pages/TesteRole2";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

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

          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<HomePage />}></Route>
            <Route path="/clientes" element={<PageCliente />} />
            <Route path="/clientes/pesquisar" element={<ConsultaClientes />} />
            <Route path="/carros/pesquisar" element={<ConsultaCarros />} />
            <Route path="/carros/novo" element={<CadastroCarros />} />
            <Route path="/carros/gerencia" element={<GerenciamentoAluguel />} />

            <Route element={<PrivateRoute allowedRoles={["CLIENTE"]} />}>
              <Route path="/teste" element={<TesteRole />}></Route>
            </Route>
            <Route element={<PrivateRoute allowedRoles={["AGENTE"]} allowedTipoAgente={["EMPRESA"]} />}>
              <Route path="/teste2" element={<TesteRole2 />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
