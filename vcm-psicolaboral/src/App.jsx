import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";
import { RequireAuth, RequireRole } from "./auth/guards";
import { ROLES } from "./data/seed";

import OfertasPage from "./pages/public/OfertasPage";
import OfertaDetallePage from "./pages/public/OfertaDetallePage";
import PostularPage from "./pages/public/PostularPage";
import LoginPage from "./pages/public/LoginPage";
import ForbiddenPage from "./pages/public/ForbiddenPage";
import NotFoundPage from "./pages/public/NotFoundPage";

import Dashboard from "./pages/app/Dashboard";
import SolicitudesPage from "./pages/app/SolicitudesPage";
import NuevaSolicitudPage from "./pages/app/NuevaSolicitudPage";
import SolicitudDetallePage from "./pages/app/SolicitudDetallePage";
import EvaluacionPage from "./pages/app/EvaluacionPage";
import OfertasAdminPage from "./pages/app/OfertasAdminPage";

function App() {
  return (
    <Routes>
      {/* Zona pública */}
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PublicLayout />}>
        <Route path="/" element={<OfertasPage />} />
        <Route path="/ofertas/:id" element={<OfertaDetallePage />} />
        <Route path="/ofertas/:id/postular" element={<PostularPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Zona privada: exige sesión; cada rol ve solo lo autorizado */}
      <Route path="/app" element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="denegado" element={<ForbiddenPage />} />
          <Route path="solicitudes" element={<SolicitudesPage />} />
          <Route path="solicitudes/:id" element={<SolicitudDetallePage />} />
          <Route element={<RequireRole roles={[ROLES.ANALISTA]} />}>
            <Route path="solicitudes/nueva" element={<NuevaSolicitudPage />} />
            <Route path="ofertas" element={<OfertasAdminPage />} />
          </Route>
          <Route element={<RequireRole roles={[ROLES.EVALUADOR]} />}>
            <Route path="solicitudes/:id/evaluacion" element={<EvaluacionPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/admin/*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

export default App;
