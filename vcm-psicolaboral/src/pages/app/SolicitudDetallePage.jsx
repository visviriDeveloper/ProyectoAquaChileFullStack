import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { obtenerSolicitud } from "../../services/solicitudesService";
import { ROLES } from "../../data/seed";
import { Breadcrumbs, Cargando, ErrorCarga, Timeline } from "../../components/feedback";
import { EstadoBadge } from "../../components/forms";
import { fechaCorta } from "../../lib/fechas";

function Dato({ etiqueta, valor, mono }) {
  return (
    <div className="mb-2">
      <div className="small text-secondary">{etiqueta}</div>
      <div className={mono ? "mono" : undefined}>{valor}</div>
    </div>
  );
}

export default function SolicitudDetallePage() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const [s, setS] = useState(null);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);
  const esAnalista = usuario.rol === ROLES.ANALISTA;

  useEffect(() => {
    obtenerSolicitud(usuario, id).then(setS).catch((e) => setError(e.message));
  }, [usuario, id, intento]);

  const cargar = () => {
    setS(null);
    setError(null);
    setIntento((n) => n + 1);
  };

  if (error) return (
    <>
      <Breadcrumbs items={[{ to: "/app", label: "Inicio" }, { to: "/app/solicitudes", label: "Solicitudes" }, { label: id }]} />
      <ErrorCarga texto={error} onReintentar={cargar} />
    </>
  );
  if (!s) return <Cargando texto="Cargando solicitud…" />;

  return (
    <>
      <Breadcrumbs items={[{ to: "/app", label: "Inicio" }, { to: "/app/solicitudes", label: "Solicitudes" }, { label: s.id }]} />
      <section className="page-head d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <h1>{s.candidato.nombre}</h1>
          <p className="mono small mb-1">{s.id} · registrado el {fechaCorta(s.fechaCreacion)}</p>
          <p className="mb-0"><strong>{s.puesto}</strong> · <span className="text-secondary">Evaluador: {s.evaluadorNombre}</span></p>
        </div>
        <EstadoBadge estado={s.evaluacion.estado} />
      </section>

      <section className="row g-3">
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Candidato</h2>
              <Dato etiqueta="RUT" valor={s.candidato.rut} mono />
              <Dato etiqueta="Correo" valor={s.candidato.correo} />
              <Dato etiqueta="Teléfono" valor={s.candidato.telefono} mono />
              <Dato etiqueta="Registrado por" valor={s.creadoPorNombre} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Evaluación psicolaboral</h2>
              <Dato etiqueta="Inicio" valor={s.evaluacion.fechaInicio ? fechaCorta(s.evaluacion.fechaInicio) : "Sin registrar"} mono />
              <Dato etiqueta="Fecha de evaluación" valor={s.evaluacion.fechaEvaluacion ? fechaCorta(s.evaluacion.fechaEvaluacion) : "Sin registrar"} mono />
              <Dato etiqueta="Observaciones" valor={s.evaluacion.observaciones || "Sin observaciones registradas"} />
              {!esAnalista && (
                <Link to={`/app/solicitudes/${s.id}/evaluacion`} className="btn btn-primary btn-sm mt-2">
                  Registrar evaluación
                </Link>
              )}
              {esAnalista && (
                <p className="small text-secondary mt-2 mb-0">Solo el profesional evaluador puede modificar la evaluación.</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Trazabilidad</h2>
              <Timeline eventos={s.historial} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
