import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Navbar reutilizable. El menú móvil lo controla React (se cierra al navegar),
// por eso ya no hace falta el JS de Bootstrap.
function NavbarBase({ brand, brandTo, links }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand" to={brandTo} onClick={() => setOpen(false)}>
          {brand}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menuPrincipal"
          aria-expanded={open}
          aria-label="Mostrar navegación"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="menuPrincipal">
          <div className="navbar-nav ms-auto">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className="nav-link" onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarBase;
