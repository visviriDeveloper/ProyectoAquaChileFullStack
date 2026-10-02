import { Link } from "react-router-dom";

function OfertaCard({ oferta }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h2 className="h5">{oferta.cargo}</h2>
          <p className="text-secondary mb-2">{oferta.ubicacion}</p>

          <div className="mb-3">
            <span className="badge text-bg-light border me-1">{oferta.familiaCargo}</span>
            {oferta.unidad && <span className="badge text-bg-light border">{oferta.unidad}</span>}
          </div>

          <p className="small text-secondary mt-auto mb-3">
            {oferta.vacantes} {oferta.vacantes === 1 ? "vacante" : "vacantes"} · Cierra el{" "}
            {new Date(oferta.fechaCierre + "T00:00").toLocaleDateString("es-CL")}
          </p>

          <div className="d-flex gap-2">
            <Link to={`/ofertas/${oferta.id}`} className="btn btn-outline-primary btn-sm">
              Ver detalle
            </Link>
            <Link to={`/ofertas/${oferta.id}/postular`} className="btn btn-primary btn-sm">
              Postular
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfertaCard;
