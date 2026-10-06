import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

// Protege rutas: exige sesión y, opcionalmente, uno de los roles indicados.
export function RequireAuth() {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function RequireRole({ roles }) {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  if (!roles.includes(usuario.rol)) return <Navigate to="/app/denegado" replace />;
  return <Outlet />;
}
