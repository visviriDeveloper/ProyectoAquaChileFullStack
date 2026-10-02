import { useEffect, useMemo, useState } from "react";
import { getOfertas } from "../../services/ofertasService";
import OfertaCard from "../../components/OfertaCard";

const unicos = (arr) => [...new Set(arr.filter(Boolean))].sort();

export default function OfertasPage() {
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [texto, setTexto] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [unidad, setUnidad] = useState("");
  const [familia, setFamilia] = useState("");

  useEffect(() => {
    getOfertas()
      .then(setOfertas)
      .catch(() => setError("No pudimos cargar las ofertas. Intenta nuevamente."))
      .finally(() => setCargando(false));
  }, []);

  const filtradas = useMemo(
    () =>
      ofertas.filter(
        (o) =>
          o.cargo.toLowerCase().includes(texto.toLowerCase()) &&
          (!ubicacion || o.ubicacion === ubicacion) &&
          (!unidad || o.unidad === unidad) &&
          (!familia || o.familiaCargo === familia)
      ),
    [ofertas, texto, ubicacion, unidad, familia]
  );

  return (
    <>
      <section className="mb-4">
        <h1 className="h3">Ofertas laborales</h1>
        <p className="text-secondary">Revisa los cargos disponibles y postula directamente, sin crear cuenta.</p>
      </section>

      <section className="row g-2 mb-4">
        <div className="col-12 col-lg-4">
          <input className="form-control" placeholder="Buscar por cargo" aria-label="Buscar por cargo"
            value={texto} onChange={(e) => setTexto(e.target.value)} />
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <select className="form-select" aria-label="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
            <option value="">Todas las ubicaciones</option>
            {unicos(ofertas.map((o) => o.ubicacion)).map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <select className="form-select" aria-label="Unidad" value={unidad} onChange={(e) => setUnidad(e.target.value)}>
            <option value="">Todas las unidades</option>
            {unicos(ofertas.map((o) => o.unidad)).map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <select className="form-select" aria-label="Familia del cargo" value={familia} onChange={(e) => setFamilia(e.target.value)}>
            <option value="">Todas las familias</option>
            {unicos(ofertas.map((o) => o.familiaCargo)).map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
      </section>

      {cargando && <p>Cargando ofertas…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!cargando && !error && filtradas.length === 0 && (
        <div className="alert alert-light border">No hay ofertas que coincidan con tu búsqueda. Prueba quitando algún filtro.</div>
      )}

      <section className="row g-3">
        {filtradas.map((o) => <OfertaCard key={o.id} oferta={o} />)}
      </section>
    </>
  );
}
