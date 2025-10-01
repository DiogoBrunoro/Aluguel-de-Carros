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
            const response = await fetch(`${apiUrl}/users`, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error("Erro ao buscar perfil. Token inválido ou expirado.");
            }

            const data: Usuario = await response.json();
            console.log("Perfil do usuário carregado:", data);
            setUser(data); 
        } catch (err: any) {
            console.error("Erro ao carregar perfil:", err);
            localStorage.removeItem("token");
            localStorage.removeItem("role"); 
            setUser(null);
            navigate("/"); 
        } finally {
            setLoading(false);
        }
    }, [navigate, apiUrl]); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserProfile(token); // Chama a função memoizada
        } else {
            // Se não houver token, não há usuário para buscar, então não está carregando.
            setUser(null);
            setLoading(false);
        }
    }, [fetchUserProfile]); // Agora fetchUserProfile é uma dependência estável

    // Função de login
    const login = useCallback(async (email: string, password: string) => {
        setLoading(true); // Define loading como true durante o login
        try {
            const response = await fetch(`${apiUrl}/users/login`, { // Use apiUrl aqui também
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha: password }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Tenta pegar a mensagem de erro do backend
                throw new Error(errorData.message || "Credenciais inválidas");
            }

            const data = await response.json(); // { token, role, ...outros dados se o backend retornar}

            console.log("Dados de login recebidos:", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
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
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setUser(null);
            navigate("/"); // Redireciona para a página inicial em caso de falha no login
            return false;
        } finally {
            setLoading(false); // Sempre define loading como false
        }
    }, [fetchUserProfile, navigate, apiUrl]); // Dependências do useCallback para login

    // Função de logout
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
        setLoading(false); // Reseta o estado de loading no logout
        navigate("/");
    }, [navigate]);

    const isAuthenticated = !!user;

    return { user, login, logout, isAuthenticated, loading };
}