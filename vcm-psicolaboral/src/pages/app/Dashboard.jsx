import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { listarSolicitudes } from "../../services/solicitudesService";
import { ROLES } from "../../data/seed";
import { Cargando, EmptyState, ErrorCarga, Timeline } from "../../components/feedback";
import { EstadoBadge } from "../../components/forms";
import { fechaCorta } from "../../lib/fechas";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
  const { usuario } = useAuth();
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);
  const esAnalista = usuario.rol === ROLES.ANALISTA;

  useEffect(() => {
    listarSolicitudes(usuario)
      .then(setDatos)
      .catch((e) => setError(e.message));
  }, [usuario, intento]);

  const cargar = () => {
    setDatos(null);
    setError(null);
    setIntento((n) => n + 1);
  };

  if (error) return <ErrorCarga texto={error} onReintentar={cargar} />;
  if (!datos) return <Cargando texto="Cargando resumen…" />;

  const pendientes = datos.filter((s) => s.evaluacion.estado === "pendiente");
  const finalizadas = datos.filter((s) => s.evaluacion.estado === "finalizada");
  const recientes = datos.slice(0, 5);

  return (
    <>
      <section className="page-head">
        <h1>{esAnalista ? "Reclutamiento" : "Mis evaluaciones"}</h1>
        <p>
          {esAnalista
            ? "Resumen del proceso de reclutamiento y evaluación psicolaboral."
            : "Solicitudes de evaluación psicolaboral asignadas a ti."}
        </p>
      </section>

      <section className="row g-3 mb-4" aria-label="Indicadores">
        <StatCard value={datos.length} label="Solicitudes registradas" />
        <StatCard value={pendientes.length} label="Evaluaciones pendientes" />
        <StatCard value={finalizadas.length} label="Evaluaciones finalizadas" />
        <StatCard value={pendientes.filter((s) => s.evaluacion.fechaInicio).length} label="En curso" />
      </section>

      <section className="row g-3">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Solicitudes recientes</h2>
                <Link to="/app/solicitudes" className="small">Ver todas</Link>
              </div>
              {recientes.length === 0 ? (
                <EmptyState titulo="Todavía no existen solicitudes registradas." texto="Cuando se registre un candidato, aparecerá aquí." />
              ) : (
                <ul className="list-unstyled mb-0 d-grid gap-2">
                  {recientes.map((s) => (
                    <li key={s.id} className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <span>
                        <Link to={`/app/solicitudes/${s.id}`} className="fw-semibold mono small">{s.id}</Link>
                        <br />
                        <span className="small text-secondary">{s.candidato.nombre} · {s.puesto}</span>
                      </span>
                      <EstadoBadge estado={s.evaluacion.estado} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
              <h2 className="h5">Acciones</h2>
              {esAnalista ? (
                <div className="d-grid gap-2">
                  <Link to="/app/solicitudes/nueva" className="btn btn-primary">Registrar candidato</Link>
                  <Link to="/app/solicitudes" className="btn btn-outline-primary">Consultar solicitudes</Link>
                </div>
              ) : (
                <div className="d-grid gap-2">
                  <Link to="/app/solicitudes" className="btn btn-primary">Ver solicitudes asignadas</Link>
                </div>
              )}
              {recientes[0] && (
                <>
                  <h3 className="h6 mt-4">Último movimiento</h3>
                  <Timeline eventos={recientes[0].historial.slice(-1)} />
                </>
              )}
              <p className="small text-secondary mt-3 mb-0">
                Pendientes sin iniciar: {pendientes.filter((s) => !s.evaluacion.fechaInicio).length} ·
                Última actualización: {recientes[0] ? fechaCorta(recientes[0].historial.at(-1)?.fecha) : "—"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
