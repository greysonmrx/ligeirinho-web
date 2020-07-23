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
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      localStorage.setItem('@Ligeirinho:token', token);
      localStorage.setItem('@Ligeirinho:user', JSON.stringify(user));

      setData({ token, user });
    } catch (err) {
      console.error(err.response.data);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
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
