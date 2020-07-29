import React, { useState, useCallback, createContext, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token?: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface IAuthProvider {
  children?: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }: IAuthProvider) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Ligeirinho:token');
    const user = localStorage.getItem('@Ligeirinho:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@Ligeirinho:token', token);
    localStorage.setItem('@Ligeirinho:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Ligeirinho:token');
    localStorage.removeItem('@Ligeirinho:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
