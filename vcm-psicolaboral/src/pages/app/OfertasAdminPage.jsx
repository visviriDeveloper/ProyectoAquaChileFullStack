import { useEffect, useState } from "react";
import { getOfertasAdmin } from "../../services/ofertasService";
import { Breadcrumbs } from "../../components/feedback";

// Solo lectura y solo Analista (ver App.jsx): referencia del catálogo de
// cargos para el proceso de reclutamiento. Sin crear/editar: fuera del MVP.
const colores = { abierta: "success", cerrada: "secondary", borrador: "warning" };

export default function OfertasAdminPage() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    getOfertasAdmin().then(setOfertas);
  }, []);

  return (
    <>
      <Breadcrumbs items={[{ to: "/app", label: "Inicio" }, { label: "Ofertas" }]} />
      <section className="page-head">
        <h1>Ofertas</h1>
        <p>Catálogo de cargos publicado en el sitio público. Solo consulta.</p>
      </section>
      <div className="table-responsive">
        <table className="table table-hover table-cards bg-white">
          <thead>
            <tr>
              <th scope="col">Cargo</th>
              <th scope="col">Familia</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Unidad</th>
              <th scope="col">Vacantes</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {ofertas.map((o) => (
              <tr key={o.id}>
                <td data-label="Cargo">{o.cargo}</td>
                <td data-label="Familia">{o.familiaCargo}</td>
                <td data-label="Ubicación">{o.ubicacion}</td>
                <td data-label="Unidad">{o.unidad ?? "—"}</td>
                <td data-label="Vacantes">{o.vacantes}</td>
                <td data-label="Estado"><span className={`badge text-bg-${colores[o.estado]}`}>{o.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
