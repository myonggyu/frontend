import React, { useState } from "react";
import { sendEmailCode, verifyEmailCode } from "../api/auth";

export default function EmailVerification({ onVerified }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setMsg(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMsg("이메일 형식이 올바르지 않습니다.");
    setLoading(true);
    try { await sendEmailCode(email); setSent(true); setMsg("인증코드를 전송했습니다. (유효 3분)"); }
    catch (e) { setMsg(e.message || "전송 실패"); }
    finally { setLoading(false); }
  };

  const handleVerify = async () => {
    setMsg(null);
    if (!code.trim()) return setMsg("인증코드를 입력하세요.");
    setLoading(true);
    try {
      const res = await verifyEmailCode(email, code.trim());
      if (res.message === "인증 성공") { setVerified(true); setMsg("인증 성공! 계속 진행하세요."); onVerified(email); }
      else setMsg("인증 실패. 코드를 확인하세요.");
    } catch (e) { setMsg(e.message || "인증 실패"); }
    finally { setLoading(false); }
  };

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="font-semibold">이메일 인증</div>
      <div className="flex gap-2">
        <input className="flex-1 border rounded-lg px-3 py-2" placeholder="user@example.com"
               value={email} onChange={(e) => setEmail(e.target.value)} disabled={verified} />
        <button className="px-4 py-2 rounded-lg border" onClick={handleSend} disabled={loading || verified}>인증번호 받기</button>
      </div>
      {sent && !verified && (
        <div className="flex gap-2">
          <input className="flex-1 border rounded-lg px-3 py-2" placeholder="인증코드 4자리"
                 value={code} onChange={(e) => setCode(e.target.value)} />
          <button className="px-4 py-2 rounded-lg border" onClick={handleVerify} disabled={loading}>인증하기</button>
        </div>
      )}
      {verified && <div className="text-green-600 text-sm">✓ 이메일 인증됨</div>}
      {msg && <div className="text-sm text-gray-600">{msg}</div>}
    </div>
  );
}
