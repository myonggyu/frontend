import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); setMsg(null); setLoading(true);
    try { await login(user_id, password); setMsg("로그인 성공!"); }
    catch (e) { setMsg(e.message || "로그인 실패"); }
    finally { setLoading(false); }
  };

  return (
    <form className="space-y-3" onSubmit={handleLogin}>
      <input className="border rounded-lg px-3 py-2 w-full" placeholder="아이디(user_id)" value={user_id} onChange={(e) => setUserId(e.target.value)} />
      <input className="border rounded-lg px-3 py-2 w-full" type="password" placeholder="비밀번호(password)" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="px-4 py-2 rounded-lg border" disabled={loading}>로그인</button>
      {msg && <div className="text-sm text-gray-600">{msg}</div>}
    </form>
  );
}
