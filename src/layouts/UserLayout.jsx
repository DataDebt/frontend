import { C } from "@/constants/colors";
import Sidebar from "@/components/layout/Sidebar";
import { MyEvaluationsView } from "@/components/views/MyEvaluationsView";
import { useAuth } from "@/context/AuthContext";

export default function UserLayout() {
  const { logout, user } = useAuth();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <Sidebar role="user" active="my-evaluations" onNav={() => {}} onLogout={logout} user={user} />
      <main style={{ flex: 1, overflowY: "auto" }}>
        <MyEvaluationsView />
      </main>
    </div>
  );
}
