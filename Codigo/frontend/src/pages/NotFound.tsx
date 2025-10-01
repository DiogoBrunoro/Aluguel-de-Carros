import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="screen-container login-bg">
      <div className="form-container">
        {/* Header */}
        <div className="header-section">
          <div className="logo-container blue-gradient">
            <SearchX className="action-icon" style={{ width: "2rem", height: "2rem", margin: 0 }} />
          </div>
          <h1 className="main-title">Página Não Encontrada</h1>
          <p className="subtitle">
            O endereço que você tentou acessar não existe.
          </p>
        </div>

        {/* Extra */}
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-500 hover:underline">
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
  );
}
