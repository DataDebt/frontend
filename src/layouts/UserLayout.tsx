import { useState } from "react";
import { C } from "@/constants/colors";
import Sidebar from "@/components/layout/Sidebar";
import { MyEvaluationsView } from "@/components/views/MyEvaluationsView";
import DataDebtPage from "@/components/views/DataDebtPage";
import ChangePasswordModal from "@/components/auth/ChangePasswordModal";
import DataDebtInfoBanner from "@/components/ui/DataDebtInfoBanner";
import { useAuth } from "@/context/AuthContext";

type UserView = "my-evaluations" | "datadebt";

export default function UserLayout() {
  const { logout, user } = useAuth();
  const [view, setView] = useState<UserView>("my-evaluations");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleNav = (key: string) => setView(key as UserView);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg, fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <Sidebar role="user" active={view} onNav={handleNav} onLogout={logout} onProfileClick={() => setShowPasswordModal(true)} user={user} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <main style={{ flex: 1, overflowY: "auto" }}>
          {view === "my-evaluations" && <MyEvaluationsView />}
          {view === "datadebt" && <DataDebtPage />}
        </main>
        {view === "my-evaluations" && <DataDebtInfoBanner onNavigate={handleNav} />}
      </div>
      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
    </div>
  );
}
