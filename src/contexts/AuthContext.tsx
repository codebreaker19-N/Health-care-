import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("arogyabandhu_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("arogyabandhu_user", JSON.stringify(user));
    else localStorage.removeItem("arogyabandhu_user");
  }, [user]);

  const signup = (name: string, email: string, _password: string) => {
    const users = JSON.parse(localStorage.getItem("arogyabandhu_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password: _password });
    localStorage.setItem("arogyabandhu_users", JSON.stringify(users));
    setUser({ name, email });
    return true;
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("arogyabandhu_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    setUser({ name: found.name, email: found.email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
