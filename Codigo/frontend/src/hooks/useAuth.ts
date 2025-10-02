import { useState, useEffect, useCallback } from "react";
import { Usuario } from "../types/types"; // Certifique-se de que Usuario tem 'role' e 'tipoAgente'
import { useNavigate } from "react-router-dom";
import apiUrl from "../api/apiUrl"; // Assumindo que apiUrl exporta uma string constante

export function useAuth() {
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserProfile = useCallback(async (token: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/users/me`, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error("Erro ao buscar perfil. Token inválido ou expirado.");
            }

            const data: Usuario = await response.json();
            setUser(data); 
        } catch (err: any) {
            console.error("Erro ao carregar perfil:", err);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role"); 
            setUser(null);
            navigate("/"); 
        } finally {
            setLoading(false);
        }
    }, [navigate, apiUrl]); 

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            fetchUserProfile(token); 
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [fetchUserProfile]); 

    // Função de login
    const login = useCallback(async (email: string, password: string) => {
        setLoading(true); 
        try {
            const response = await fetch(`${apiUrl}/users/login`, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha: password }),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || "Credenciais inválidas");
            }
            const data = await response.json(); 
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.role);
            await fetchUserProfile(data.token);

            if (data.role === "CLIENTE") {
                navigate("/cliente");
            } else if (data.role === "AGENTE") {
                navigate('/agente');
            } else {
                // Redirecionamento padrão ou caso o role não seja reconhecido
                navigate("/");
            }
            return true;
        } catch (err: any) {
            console.error("Erro no login:", err.message);
            // Em caso de erro de login, limpa tudo e redireciona.
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            setUser(null);
            navigate("/"); // Redireciona para a página inicial em caso de falha no login
            return false;
        } finally {
            setLoading(false); // Sempre define loading como false
        }
    }, [fetchUserProfile, navigate, apiUrl]); // Dependências do useCallback para login

    // Função de logout
    const logout = useCallback(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        setUser(null);
        setLoading(false); // Reseta o estado de loading no logout
        navigate("/");
    }, [navigate]);

    const isAuthenticated = !!user;

    return { user, login, logout, isAuthenticated, loading };
}