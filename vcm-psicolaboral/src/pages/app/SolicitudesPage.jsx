import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { listarSolicitudes } from "../../services/solicitudesService";
import { ROLES } from "../../data/seed";
import { Breadcrumbs, Cargando, EmptyState, ErrorCarga } from "../../components/feedback";
import { EstadoBadge } from "../../components/forms";
import { fechaCorta } from "../../lib/fechas";

export default function SolicitudesPage() {
  const { usuario } = useAuth();
  const [lista, setLista] = useState(null);
  const [error, setError] = useState(null);
  const [texto, setTexto] = useState("");
  const [estado, setEstado] = useState("");
  const [intento, setIntento] = useState(0);
  const esAnalista = usuario.rol === ROLES.ANALISTA;

  useEffect(() => {
    listarSolicitudes(usuario, { texto, estado })
      .then(setLista)
      .catch((e) => setError(e.message));
  }, [usuario, texto, estado, intento]);

  const cargar = () => {
    setLista(null);
    setError(null);
    setIntento((n) => n + 1);
  };

  const hayFiltros = useMemo(() => texto !== "" || estado !== "", [texto, estado]);

  return (
    <>
      <Breadcrumbs items={[{ to: "/app", label: "Inicio" }, { label: "Solicitudes" }]} />
      <section className="page-head d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <h1>Solicitudes</h1>
          <p>{esAnalista ? "Candidatos registrados y estado de su evaluación." : "Evaluaciones asignadas a ti."}</p>
        </div>
        {esAnalista && <Link to="/app/solicitudes/nueva" className="btn btn-primary">Registrar candidato</Link>}
      </section>

      <section className="row g-2 mb-3" aria-label="Filtros">
        <div className="col-12 col-md-6">
          <label htmlFor="buscar" className="sr-only">Buscar solicitudes</label>
          <input
            id="buscar" className="form-control" placeholder="Buscar por nombre, RUT, puesto o folio…"
            value={texto} onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="filtro-estado" className="sr-only">Filtrar por estado</label>
          <select id="filtro-estado" className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>
        <div className="col-12 col-md-3 d-flex align-items-center">
          <p className="small text-secondary mb-0" role="status">
            {lista ? `${lista.length} resultado${lista.length === 1 ? "" : "s"}` : "…"}
          </p>
        </div>
      </section>

      {error && <ErrorCarga texto={error} onReintentar={cargar} />}
      {!error && !lista && <Cargando texto="Cargando solicitudes…" />}
      {!error && lista && lista.length === 0 && !hayFiltros && (
        <EmptyState
          titulo="Todavía no existen solicitudes registradas."
          texto={esAnalista ? "Registra el primer candidato para iniciar el proceso." : "Aún no tienes evaluaciones asignadas."}
        >
          {esAnalista && <Link to="/app/solicitudes/nueva" className="btn btn-primary">Registrar candidato</Link>}
        </EmptyState>
      )}
      {!error && lista && lista.length === 0 && hayFiltros && (
        <EmptyState titulo="Sin resultados" texto="Ninguna solicitud coincide con los filtros.">
          <button type="button" className="btn btn-outline-primary" onClick={() => { setTexto(""); setEstado(""); }}>
            Limpiar filtros
          </button>
        </EmptyState>
      )}
      {!error && lista && lista.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover table-cards bg-white">
            <thead>
              <tr>
                <th scope="col">Solicitud</th>
                <th scope="col">Candidato</th>
                <th scope="col">Fecha registro</th>
                <th scope="col">Estado</th>
                <th scope="col"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {lista.map((s) => (
                <tr key={s.id}>
                  <td data-label="Solicitud">
                    <span className="mono small d-block">{s.id}</span>
                    <span className="small text-secondary">{s.puesto}</span>
                  </td>
                  <td data-label="Candidato">
                    <span className="d-block">{s.candidato.nombre}</span>
                    <span className="mono small text-secondary">{s.candidato.rut}</span>
                  </td>
                  <td data-label="Registro" className="mono small">{fechaCorta(s.fechaCreacion)}</td>
                  <td data-label="Estado"><EstadoBadge estado={s.evaluacion.estado} /></td>
                  <td className="no-label text-md-end">
                    <Link to={`/app/solicitudes/${s.id}`} className="btn btn-outline-primary btn-sm me-1">Ver detalle</Link>
                    {!esAnalista && (
                      <Link to={`/app/solicitudes/${s.id}/evaluacion`} className="btn btn-primary btn-sm">Evaluar</Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
