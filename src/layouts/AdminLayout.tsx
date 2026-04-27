"use client";

import { useState } from "react";
import { C } from "@/constants/colors";
import Sidebar from "@/components/layout/Sidebar";
import { DomainsView } from "@/components/views/DomainsView";
import { ReportsView } from "@/components/views/ReportsView";
import { EvaluationsView } from "@/components/views/EvaluationsView";
import { useAuth } from "@/context/AuthContext";

type AdminView = "domains" | "reports" | "evaluations";

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const [view, setView] = useState<AdminView>("domains");

  const handleNav = (key: string) => setView(key as AdminView);
  const handleReport = (_id: number) => { setView("reports"); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <Sidebar role="admin" active={view} onNav={handleNav} onLogout={logout} user={user} />
      <main style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
        {view === "domains" && <DomainsView />}
        {view === "reports" && <ReportsView />}
        {view === "evaluations" && <EvaluationsView onReport={handleReport} />}
      </main>
    </div>
  );
}
