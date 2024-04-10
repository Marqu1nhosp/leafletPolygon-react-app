import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";

interface User {
    username: string;
    password: string;
}

interface AuthContextType {
    user: string | null;
    userId: string | null; // Estado para o ID do usuário
    token: string | null;
    signIn: (userData: User) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    userId: null,
    token: null,
    signIn: async () => {},
    signOut: () => {},
    isAuthenticated: false,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null); // Estado para o ID do usuário
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const loadingStoredData = async () => {
            const storedToken = localStorage.getItem("@Auth:token");
            const storedUserData = localStorage.getItem("@Auth:user");
    
            if (storedToken && storedUserData) {
                const userData = JSON.parse(storedUserData);
                const { username, id } = userData;
    
                setToken(storedToken);
                setUser(username);
                setUserId(id); // Definir o estado do ID do usuário
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false); // Se não houver dados armazenados, definir isAuthenticated como false
            }
        };
    
        loadingStoredData();
    }, []);
    

    async function signIn({ username, password }: User) {
        try {
            const response = await api.post('/auth', { username, password });
            const { token, user } = response.data;

            setToken(token);
            setUser(user.username);
            setUserId(user.id); // Definir o estado do ID do usuário
            setIsAuthenticated(true);

            localStorage.setItem("@Auth:token", token);
            localStorage.setItem("@Auth:user", JSON.stringify({ username: user.username, id: user.id}));

            console.log("Usuário autenticado");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setIsAuthenticated(false); // Certifique-se de definir isAuthenticated como false em caso de falha no login
            throw error; 
        }
    }

    function signOut() {
        setUser(null);
        setUserId(null); // Resetar o estado do ID do usuário
        setToken(null);
        setIsAuthenticated(false);

        localStorage.removeItem("@Auth:token");
        localStorage.removeItem("@Auth:user");
    }

    return (
        <AuthContext.Provider value={{ user, userId, token, signIn, signOut, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
