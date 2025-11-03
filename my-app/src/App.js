// src/App.js
import React from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfileBox from "./components/ProfileBox";
import { useAuth } from "./context/AuthContext";

function Home() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">로딩 중…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Auth Demo (세션 쿠키)</h1>
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-4 space-y-4">
          <div className="font-semibold">로그인</div>
          <LoginForm />
        </div>
        <div className="rounded-2xl border p-4 space-y-4">
          <div className="font-semibold">회원가입 + 이메일 인증</div>
          <SignupForm />
        </div>
      </section>
      <section>
        <ProfileBox />
        {user ? (
          <div className="text-sm text-green-700 mt-2">로그인됨: {user.user_id}</div>
        ) : (
          <div className="text-sm text-gray-600 mt-2">로그인 후 /me 접근 가능</div>
        )}
      </section>
    </div>
  );
}

export default function App() {
  return <Home />;
}
