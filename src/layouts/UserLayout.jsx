import { C } from "@/constants/colors";
import Sidebar from "@/components/layout/Sidebar";
import { MyEvaluationsView } from "@/components/views/MyEvaluationsView";

export default function UserLayout({ onLogout }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <Sidebar role="user" active="my-evaluations" onNav={() => {}} onLogout={onLogout} />
      <main style={{ flex: 1, overflowY: "auto" }}>
        <MyEvaluationsView />
      </main>
    </div>
  );
}