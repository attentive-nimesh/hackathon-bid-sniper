import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  user: { source_email: string } | null;
  token: string | null;
  login: (data: { token: string; user: { source_email: string } }) => void;
  logout: () => void;
}>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<{ source_email: string } | null>(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    return JSON.parse(userData);
  });

  const login = (data: { token: string; user: { source_email: string } }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
