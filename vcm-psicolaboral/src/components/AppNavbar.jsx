import NavbarBase from "./NavbarBase";

const links = [
  { to: "/admin", label: "Inicio", end: true },
  { to: "/admin/ofertas", label: "Ofertas" },
  { to: "/admin/candidatos", label: "Candidatos" },
  { to: "/admin/solicitudes", label: "Solicitudes" },
  { to: "/", label: "Ver sitio público" },
];

export default function AppNavbar() {
  return <NavbarBase brand="VcM · Administración" brandTo="/admin" links={links} />;
}
