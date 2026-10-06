import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
import { useAuth } from "../auth/useAuth";

// Shell autenticado: sidebar + contenido. El menú móvil lo controla React.
export default function AppLayout() {
  const [abierto, setAbierto] = useState(false);
  const { usuario } = useAuth();
  const cerrar = () => setAbierto(false);

  return (
    <div className="app-shell">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <AppSidebar abierto={abierto} onNavegar={cerrar} />
      {abierto && (
        <div className="sidebar-scrim d-md-none" onClick={cerrar} aria-hidden="true" />
      )}
      <div className="app-main">
        <header className="app-topbar">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-md-none"
            aria-expanded={abierto}
            aria-controls="menuPrincipal"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto(!abierto)}
          >
            ☰
          </button>
          <span className="ms-auto small text-secondary">
            {usuario?.nombre} · {usuario?.cargo}
          </span>
        </header>
        <main id="contenido" className="app-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
