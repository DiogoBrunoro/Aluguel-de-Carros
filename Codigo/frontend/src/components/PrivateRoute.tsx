import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  allowedRoles?: Array<"CLIENTE" | "AGENTE">;
  allowedTipoAgente?: Array<"BANCO" | "EMPRESA">;
}

export function PrivateRoute({ allowedRoles, allowedTipoAgente }: PrivateRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  // Se não estiver logado, manda pro login
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

  // Verifica se o role é permitido
  if (allowedRoles && !allowedRoles.includes(user!.role!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Se for agente, ainda valida o tipoAgente
  if (user?.role === "AGENTE" && allowedTipoAgente) {
    if (!allowedTipoAgente.includes(user.tipoAgente!)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}
