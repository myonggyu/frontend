import React from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileBox() {
  const { user, logout, refresh } = useAuth();
  if (!user) return <div className="text-sm text-gray-600">로그인 상태가 아닙니다.</div>;
  return (
    <div className="rounded-2xl border p-4 space-y-2">
      <div className="font-semibold">내 정보</div>
      <div className="text-sm">아이디: {user.user_id}</div>
      {user.user_name && <div className="text-sm">이름: {user.user_name}</div>}
      {user.user_nickname && <div className="text-sm">닉네임: {user.user_nickname}</div>}
      <div className="text-sm">이메일: {user.email}</div>
      <div className="flex gap-2 pt-2">
        <button className="px-3 py-1.5 rounded-lg border" onClick={refresh}>새로고침</button>
        <button className="px-3 py-1.5 rounded-lg border" onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
}
