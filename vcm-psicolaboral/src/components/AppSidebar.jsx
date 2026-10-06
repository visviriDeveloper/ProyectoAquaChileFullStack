import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { ROLES } from "../data/seed";

const Icon = ({ d }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  inicio: "M2.5 6.5 8 2l5.5 4.5V13.5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V6.5Z",
  lista: "M2.5 4h11M2.5 8h11M2.5 12h11",
  nueva: "M8 2.5v11M2.5 8h11",
  ofertas: "M3 5.5A1.5 1.5 0 0 1 4.5 4h7A1.5 1.5 0 0 1 13 5.5V13H3V5.5ZM6 4V2.5h4V4",
  sitio: "M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM2.5 8h11M8 2c-3 3.5-3 8.5 0 12 3-3.5 3-8.5 0-12Z",
};

export default function AppSidebar({ abierto, onNavegar }) {
  const { usuario, salir } = useAuth();
  const navigate = useNavigate();
  const esAnalista = usuario?.rol === ROLES.ANALISTA;

  const cerrarSesion = () => {
    salir();
    onNavegar();
    navigate("/login");
  };

  const links = [
    { to: "/app", label: "Inicio", end: true, icon: ICONS.inicio },
    { to: "/app/solicitudes", label: "Solicitudes", icon: ICONS.lista },
    esAnalista && { to: "/app/solicitudes/nueva", label: "Nueva solicitud", icon: ICONS.nueva },
    esAnalista && { to: "/app/ofertas", label: "Ofertas", icon: ICONS.ofertas },
  ].filter(Boolean);

  return (
    <aside className={`app-sidebar${abierto ? " open" : ""}`} aria-label="Panel lateral">
      <div className="app-brand">
        VcM Psicolaboral
        <small>AquaChile · Reclutamiento</small>
      </div>
      <nav className="app-nav" aria-label="Principal">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={onNavegar}>
            <Icon d={l.icon} /> {l.label}
          </NavLink>
        ))}
        <NavLink to="/" onClick={onNavegar}>
          <Icon d={ICONS.sitio} /> Ver sitio público
        </NavLink>
      </nav>
      <div className="app-user">
        <strong>{usuario?.nombre}</strong>
        <span>{usuario?.cargo}</span>
        <button type="button" className="btn btn-sm btn-outline-light mt-2 w-100" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
