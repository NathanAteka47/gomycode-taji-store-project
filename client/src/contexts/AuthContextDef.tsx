import { createContext } from 'react';

interface AuthContextType {
  user: { username: string } | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
}); 