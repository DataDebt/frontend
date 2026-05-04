"use client";

import { useState } from "react";
import { C } from "@/constants/colors";
import Sidebar from "@/components/layout/Sidebar";
import { DomainsView } from "@/components/views/DomainsView";
import { ReportsView } from "@/components/views/ReportsView";
import { EvaluationsView } from "@/components/views/EvaluationsView";
import DataDebtPage from "@/components/views/DataDebtPage";
import AdminUsersView from "@/components/views/AdminUsersView";
import ChangePasswordModal from "@/components/auth/ChangePasswordModal";
import DataDebtInfoBanner from "@/components/ui/DataDebtInfoBanner";
import { useAuth } from "@/context/AuthContext";

type AdminView = "domains" | "reports" | "evaluations" | "users" | "datadebt";

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const [view, setView] = useState<AdminView>("domains");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleNav = (key: string) => setView(key as AdminView);
  const handleReport = (_id: number) => { setView("reports"); };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg, fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <Sidebar role="admin" active={view} onNav={handleNav} onLogout={logout} onProfileClick={() => setShowPasswordModal(true)} user={user} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <main style={{ flex: 1, overflowY: "auto" }}>
          {view === "domains" && <DomainsView />}
          {view === "reports" && <ReportsView />}
          {view === "evaluations" && <EvaluationsView onReport={handleReport} />}
          {view === "users" && <AdminUsersView />}
          {view === "datadebt" && <DataDebtPage />}
        </main>
        {view === "domains" && <DataDebtInfoBanner onNavigate={handleNav} />}
      </div>
      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
    </div>
  );
}
