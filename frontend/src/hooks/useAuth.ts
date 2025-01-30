import { useState, useCallback, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (data: RegisterData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://source.unsplash.com/100x100/?portrait`
    });
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      email: data.email,
      name: data.name,
      avatar: `https://source.unsplash.com/100x100/?portrait`,
      phone: data.phone,
      address: data.address
    });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    signIn,
    signOut,
    register
  };
}