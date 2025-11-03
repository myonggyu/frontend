import React, { useState } from "react";
import EmailVerification from "./EmailVerification";
import { signup } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function SignupForm() {
  const { refresh } = useAuth();
  const [emailVerifiedFor, setEmailVerifiedFor] = useState(null);
  const [form, setForm] = useState({ user_id: "", user_name: "", user_nickname: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = emailVerifiedFor === form.email && form.user_id && form.password;
  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const handleVerified = (email) => { setEmailVerifiedFor(email); setForm((s) => ({ ...s, email })); };

  const handleSignup = async (e) => {
    e.preventDefault(); setMsg(null);
    if (!canSubmit) return setMsg("이메일 인증 완료 후 필수 항목을 채워주세요.");
    setLoading(true);
    try { await signup(form); setMsg("회원가입 완료! 자동 로그인되었습니다."); await refresh(); }
    catch (e) { setMsg(e.message || "회원가입 실패"); }
    finally { setLoading(false); }
  };

  return (
    <form className="space-y-4" onSubmit={handleSignup}>
      <EmailVerification onVerified={handleVerified} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border rounded-lg px-3 py-2" placeholder="아이디(user_id)" value={form.user_id} onChange={onChange("user_id")} />
        <input className="border rounded-lg px-3 py-2" placeholder="이름(user_name)" value={form.user_name} onChange={onChange("user_name")} />
        <input className="border rounded-lg px-3 py-2" placeholder="닉네임(user_nickname)" value={form.user_nickname} onChange={onChange("user_nickname")} />
        <input className="border rounded-lg px-3 py-2" placeholder="이메일(email)" value={form.email} onChange={onChange("email")} disabled />
        <input type="password" className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="비밀번호(password)" value={form.password} onChange={onChange("password")} />
      </div>
      <button className="px-4 py-2 rounded-lg border" disabled={!canSubmit || loading}>회원가입</button>
      {msg && <div className="text-sm text-gray-600">{msg}</div>}
    </form>
  );
}
