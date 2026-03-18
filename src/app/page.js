"use client";

import { useState } from "react";
import LoginScreen from "@/components/views/LoginScreen";
import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";

export default function Page() {
  const [auth, setAuth] = useState(null);

  if (!auth) return <LoginScreen onLogin={setAuth} />;
  if (auth === "admin") return <AdminLayout onLogout={() => setAuth(null)} />;
  return <UserLayout onLogout={() => setAuth(null)} />;
}