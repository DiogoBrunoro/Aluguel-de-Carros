import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/NavBar";
import './App.css'
import PageCliente from './pages/PageCliente'
import CadastroCliente from './pages/CadastroCliente'
import ConsultaClientes from './pages/ConsultaClientes'
import ConsultaCarros from './pages/ConsultaCarros';
import GerenciamentoAluguel from './pages/GerenciaAlugueis';
import HomePage from './pages/Home';
import CadastroCarros from './pages/CadastroCarros';

export default function App() {
  const links = [
    { label: "Clientes", href: "/" },
    { label: "Reservas", href: "/reservas" },
    { label: "Frota", href: "/frota" },
  ];

  return (
    <BrowserRouter>
      <div className='bg-animated'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<PageCliente />} />         
          <Route path="/clientes/novo" element={<CadastroCliente />} />
          <Route path="/clientes/pesquisar" element={<ConsultaClientes />} /> 
          <Route path='/carros/pesquisar' element={<ConsultaCarros />} />
          <Route path='/carros/novo' element={<CadastroCarros />} />
          <Route path='/carros/gerencia' element={<GerenciamentoAluguel />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
