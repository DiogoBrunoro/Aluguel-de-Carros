import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/NavBar";
import './App.css'
import PageCliente from './pages/PageCliente'
import CadastroCliente from './pages/CadastroCliente'
import ConsultaClientes from './pages/ConsultaClientes'

export default function App() {
  const links = [
    { label: "Clientes", href: "/" },
    { label: "Reservas", href: "/reservas" },
    { label: "Frota", href: "/frota" },
  ];

  return (
    <BrowserRouter>
      <div className='bg-animated'>
        <Navbar title="Aluguel de Carros" links={links} />
        <Routes>
          <Route path="/" element={<PageCliente />} />         
          <Route path="/clientes/novo" element={<CadastroCliente />} />
          <Route path="/clientes/pesquisar" element={<ConsultaClientes />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  )
}
