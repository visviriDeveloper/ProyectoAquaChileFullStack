import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import OfertasPage from "./pages/public/OfertasPage";
import OfertaDetallePage from "./pages/public/OfertaDetallePage";
import PostularPage from "./pages/public/PostularPage";
import LoginPage from "./pages/public/LoginPage";
import NotFoundPage from "./pages/public/NotFoundPage";

import Dashboard from "./pages/admin/Dashboard";
import CandidatosPage from "./pages/admin/CandidatosPage";
import SolicitudesPage from "./pages/admin/SolicitudesPage";
import OfertasAdminPage from "./pages/admin/OfertasAdminPage";

function App() {
  return (
    <Routes>
      {/* Zona pública */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<OfertasPage />} />
        <Route path="/ofertas/:id" element={<OfertaDetallePage />} />
        <Route path="/ofertas/:id/postular" element={<PostularPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Zona privada (más adelante: envolver con una ruta protegida) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="candidatos" element={<CandidatosPage />} />
        <Route path="solicitudes" element={<SolicitudesPage />} />
        <Route path="ofertas" element={<OfertasAdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
