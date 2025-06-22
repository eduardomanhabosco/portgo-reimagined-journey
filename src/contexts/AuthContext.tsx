import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define o formato do objeto de usuário, incluindo o campo 'school'
interface User {
  id: number;
  name: string;
  email: string;
  school: string;
  score: number;
}

// Define o que guardamos no nosso estado de autenticação
interface AuthState {
  user: User | null;
  token: string | null;
}

// Define o que o nosso contexto vai fornecer para os componentes da aplicação
interface AuthContextType {
  auth: AuthState;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (newUserData: User) => void; // Para atualizar o perfil
  updateUserScore: (newScore: number) => void; // Para atualizar a pontuação
  isAuthenticated: boolean;
}

// Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cria o "Provedor" do contexto, que vai envolver nosso app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, token: null });

  // Ao carregar o app, verifica se há um usuário salvo no localStorage
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    } catch (error) {
      console.error("Falha ao carregar dados de autenticação:", error);
      localStorage.removeItem('auth');
    }
  }, []);

  // Função para realizar o login
  const login = (userData: User, token: string) => {
    const authState = { user: userData, token };
    setAuth(authState);
    localStorage.setItem('auth', JSON.stringify(authState));
  };

  // Função para realizar o logout
  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('auth');
    window.location.href = '/login'; // Redireciona para a página de login
  };
  
  // Função para atualizar os dados do usuário (ex: após editar o perfil)
  const updateUser = (newUserData: User) => {
    setAuth(prevAuth => {
      const newAuth = { ...prevAuth, user: newUserData };
      localStorage.setItem('auth', JSON.stringify(newAuth));
      return newAuth;
    });
  };

  // Função para atualizar apenas a pontuação do usuário
  const updateUserScore = (newScore: number) => {
    setAuth(prevAuth => {
      if (prevAuth.user) {
        const updatedUser = { ...prevAuth.user, score: newScore };
        const updatedAuthState = { ...prevAuth, user: updatedUser };
        localStorage.setItem('auth', JSON.stringify(updatedAuthState));
        return updatedAuthState;
      }
      return prevAuth;
    });
  };
  
  const isAuthenticated = !!auth.token;

  // Disponibiliza os valores para os componentes filhos
  return (
    <AuthContext.Provider value={{ auth, login, logout, updateUser, updateUserScore, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto nos componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};