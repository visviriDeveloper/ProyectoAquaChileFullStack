import NavbarBase from "./NavbarBase";

const links = [
  { to: "/", label: "Ofertas laborales", end: true },
  { to: "/login", label: "Acceso equipo" },
];

export default function PublicNavbar() {
  return <NavbarBase brand="VcM Psicolaboral" brandTo="/" links={links} />;
}
