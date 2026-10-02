import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOferta } from "../../services/ofertasService";

export default function OfertaDetallePage() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOferta(id).then(setOferta).catch(() => setError("Esta oferta no existe o ya no está disponible."));
  }, [id]);

  if (error) return (
    <div className="alert alert-warning">
      {error} <Link to="/">Volver a las ofertas</Link>
    </div>
  );
  if (!oferta) return <p>Cargando…</p>;

  return (
    <article className="col-lg-8">
      <Link to="/" className="small">← Volver a las ofertas</Link>
      <h1 className="h3 mt-2">{oferta.cargo}</h1>
      <p className="text-secondary">
        {oferta.ubicacion} · {oferta.familiaCargo}{oferta.unidad ? ` · ${oferta.unidad}` : ""}
      </p>

      <h2 className="h5 mt-4">Descripción</h2>
      <p>{oferta.descripcion}</p>

      <h2 className="h5">Requisitos</h2>
      <ul>{oferta.requisitos.map((r) => <li key={r}>{r}</li>)}</ul>

      <p className="small text-secondary">
        {oferta.vacantes} {oferta.vacantes === 1 ? "vacante" : "vacantes"} · Cierra el{" "}
        {new Date(oferta.fechaCierre + "T00:00").toLocaleDateString("es-CL")}
      </p>

      <Link to={`/ofertas/${oferta.id}/postular`} className="btn btn-primary">Postular a este cargo</Link>
    </article>
  );
}
