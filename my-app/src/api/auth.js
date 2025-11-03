import { http } from "./http";

export function sendEmailCode(email) {
  return http("/auth/send-code", { method: "POST", body: { email } });
}
export function verifyEmailCode(email, code) {
  return http("/auth/verify-code", { method: "POST", body: { email, code } });
}
export function signup({ user_id, user_name, user_nickname, email, password }) {
  return http("/auth/signup", { method: "POST", body: { user_id, user_name, user_nickname, email, password } });
}
export function login(user_id, password) {
  return http("/login", { method: "POST", body: { user_id, password } });
}
export function logout() {
  return http("/logout", { method: "POST" });
}
export function me() {
  return http("/me"); // GET
}
