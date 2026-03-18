import { C } from "@/constants/colors";
import { MdDomain, MdBarChart, MdAssignment, MdLogout } from "react-icons/md";

export default function Sidebar({ role, active, onNav, onLogout }) {
  const adminItems = [
    { key: "domains", icon: <MdDomain size={20} />, label: "Dominios" },
    { key: "reports", icon: <MdBarChart size={20} />, label: "Reportes" },
    { key: "evaluations", icon: <MdAssignment size={20} />, label: "Evaluaciones" },
  ];
  const userItems = [
    { key: "my-evaluations", icon: <MdAssignment size={20} />, label: "Mis Evaluaciones" },
  ];
  const items = role === "admin" ? adminItems : userItems;

  return (
    <div style={{ width: 230, minHeight: "100vh", background: C.sidebar, display: "flex", flexDirection: "column", boxShadow: "4px 0 24px rgba(0,0,0,0.18)", position: "relative", zIndex: 10 }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "#fff" }}>D</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>Data Debt</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>Data Debt</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {items.map(({ key, icon, label }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onNav(key)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                background: isActive ? C.sidebarActive : "transparent",
                border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 4,
                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                transition: "all .2s", textAlign: "left",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.sidebarHover; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; } }}
            >
              <span style={{ fontSize: 18 }}>{icon}</span>
              {label}
              {isActive && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: C.accentLight }} />}
            </button>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, #1a5c3a)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
            {role === "admin" ? "A" : "U"}
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{role === "admin" ? "Administrador" : "Usuario"}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{role === "admin" ? "admin@demo.com" : "user@demo.com"}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width: "100%", padding: "9px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", transition: "all .2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(224,82,82,0.2)"; e.currentTarget.style.color = "#f87171"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
        >
         Cerrar sesión ⏻  
        </button>
      </div>
    </div>
  );
}
