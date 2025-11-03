import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, logout as apiLogout, me as apiMe } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try { setUser(await apiMe()); }
    catch { setUser(null); }
  };

  useEffect(() => { (async () => { setLoading(true); await refresh(); setLoading(false); })(); }, []);

  const login = async (user_id, password) => { await apiLogin(user_id, password); await refresh(); };
  const logout = async () => { await apiLogout(); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
