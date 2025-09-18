import React from "react";
import "../styles/PageClienteMenu.css"; // importa o CSS externo

export default function PageClienteMenu() {
  return (
    <div className="clients-screen">
      <div className="clients-wrap">
        <h2 className="clients-title">Clientes</h2>
        <p className="clients-sub">Escolha uma opção</p>

        <div className="clients-grid">
          {/* Cadastrar */}
          <a className="clients-card" href="/clientes/novo">
            <div className="clients-card__icon">＋</div>
            <h3 className="clients-card__title">Cadastrar</h3>
            <p className="clients-card__desc">
              Adicione um novo cliente ao sistema.
            </p>
            <span className="clients-card__action">Abrir</span>
          </a>

          {/* Consultar / Verificar */}
          <a className="clients-card" href="/clientes/pesquisar">
            <div className="clients-card__icon">🔎</div>
            <h3 className="clients-card__title">Consultar</h3>
            <p className="clients-card__desc">
              Busque e verifique dados de clientes.
            </p>
            <span className="clients-card__action">Abrir</span>
          </a>

          {/* Alterar / Excluir */}
          <a className="clients-card" href="/clientes/pesquisar">
            <div className="clients-card__icon">✎</div>
            <h3 className="clients-card__title">Alterar / Excluir</h3>
            <p className="clients-card__desc">
              Edite ou remova cadastros existentes.
            </p>
            <span className="clients-card__action">Abrir</span>
          </a>
        </div>
      </div>
    </div>
  );
}