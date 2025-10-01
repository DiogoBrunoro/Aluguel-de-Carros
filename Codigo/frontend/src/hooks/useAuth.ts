import { useState, useEffect, useCallback } from "react";
import { Usuario } from "../types/types";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

    const navivate = useNavigate()
  // Carregar user completo no início
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Função para buscar perfil completo do usuário
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar perfil");

      const data: Usuario = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Função de login
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      if (!response.ok) throw new Error("Credenciais inválidas");

      const data = await response.json(); // { token, role }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // buscar perfil completo
      await fetchUserProfile(data.token);
      navivate('/home')
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, []);

  // Função de logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  }, []);

  return { user, login, logout, isAuthenticated: !!user, loading };
}
