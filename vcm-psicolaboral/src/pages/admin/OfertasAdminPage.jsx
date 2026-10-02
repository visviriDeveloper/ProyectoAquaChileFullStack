import { useEffect, useState } from "react";
import { getOfertasAdmin } from "../../services/ofertasService";

const colores = { abierta: "success", cerrada: "secondary", borrador: "warning" };

export default function OfertasAdminPage() {
  const [ofertas, setOfertas] = useState([]);
  useEffect(() => { getOfertasAdmin().then(setOfertas); }, []);

  return (
    <>
      <h1 className="h3 mb-3">Ofertas</h1>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white">
          <thead>
            <tr>
              <th>Cargo</th><th>Familia</th><th>Ubicación</th><th>Unidad</th>
              <th>Vacantes</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ofertas.map((o) => (
              <tr key={o.id}>
                <td>{o.cargo}</td>
                <td>{o.familiaCargo}</td>
                <td>{o.ubicacion}</td>
                <td>{o.unidad ?? "—"}</td>
                <td>{o.vacantes}</td>
                <td><span className={`badge text-bg-${colores[o.estado]}`}>{o.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small text-secondary">Pendiente: crear, editar y cerrar ofertas.</p>
    </>
  );
}
