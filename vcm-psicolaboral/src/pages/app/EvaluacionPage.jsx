import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../auth/useAuth";
import { cambiarEstado, obtenerSolicitud, registrarEvaluacion } from "../../services/solicitudesService";
import { Breadcrumbs, Cargando, ConfirmDialog, ErrorCarga, Timeline } from "../../components/feedback";
import { useToast } from "../../components/toast";
import { Campo, EstadoBadge } from "../../components/forms";

const schema = z.object({
  fechaInicio: z.string().optional(),
  fechaEvaluacion: z.string().optional(),
  observaciones: z.string().max(1000, "Máximo 1000 caracteres").optional(),
});

export default function EvaluacionPage() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const { avisar } = useToast();
  const [s, setS] = useState(null);
  const [error, setError] = useState(null);
  const [errorEnvio, setErrorEnvio] = useState(null);
  const [confirmar, setConfirmar] = useState(null); // "finalizada" | "pendiente" | null
  const [intento, setIntento] = useState(0);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    obtenerSolicitud(usuario, id)
      .then((sol) => {
        setS(sol);
        reset({
          fechaInicio: sol.evaluacion.fechaInicio || "",
          fechaEvaluacion: sol.evaluacion.fechaEvaluacion || "",
          observaciones: sol.evaluacion.observaciones || "",
        });
      })
      .catch((e) => setError(e.message));
  }, [usuario, id, intento, reset]);

  const cargar = () => {
    setS(null);
    setError(null);
    setIntento((n) => n + 1);
  };

  const onGuardar = async (datos) => {
    setErrorEnvio(null);
    if (datos.fechaInicio && datos.fechaEvaluacion && datos.fechaEvaluacion < datos.fechaInicio) {
      setErrorEnvio("La fecha de evaluación no puede ser anterior a la fecha de inicio.");
      return;
    }
    try {
      const actualizada = await registrarEvaluacion(usuario, id, datos);
      setS(actualizada);
      avisar("Evaluación guardada.");
    } catch (e) {
      setErrorEnvio(e.message);
    }
  };

  const onCambiarEstado = async () => {
    setErrorEnvio(null);
    try {
      const actualizada = await cambiarEstado(usuario, id, confirmar);
      setS(actualizada);
      avisar(confirmar === "finalizada" ? "Evaluación finalizada." : "Evaluación reabierta.");
    } catch (e) {
      setErrorEnvio(e.message);
    } finally {
      setConfirmar(null);
    }
  };

  if (error) return (
    <>
      <Breadcrumbs items={[{ to: "/app", label: "Inicio" }, { to: "/app/solicitudes", label: "Solicitudes" }, { label: id }]} />
      <ErrorCarga texto={error} onReintentar={cargar} />
    </>
  );
  if (!s) return <Cargando texto="Cargando evaluación…" />;

  const finalizada = s.evaluacion.estado === "finalizada";

  return (
    <>
      <Breadcrumbs items={[
        { to: "/app", label: "Inicio" },
        { to: "/app/solicitudes", label: "Solicitudes" },
        { to: `/app/solicitudes/${s.id}`, label: s.id },
        { label: "Evaluación" },
      ]} />
      <section className="page-head d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <h1>Evaluación psicolaboral</h1>
          <p className="mb-0">{s.candidato.nombre} · <strong>{s.puesto}</strong> · <span className="mono small">{s.candidato.rut}</span></p>
        </div>
        <EstadoBadge estado={s.evaluacion.estado} />
      </section>

      {errorEnvio && <div className="alert alert-danger" role="alert">{errorEnvio}</div>}

      <section className="row g-3">
        <div className="col-lg-7">
          <form onSubmit={handleSubmit(onGuardar)} noValidate>
            <div className="card mb-3">
              <div className="card-body">
                <h2 className="h5">Registro de la evaluación</h2>
                <div className="row">
                  <div className="col-md-6">
                    <Campo id="fechaInicio" label="Fecha de inicio" error={errors.fechaInicio?.message}>
                      <input type="date" className="form-control" {...register("fechaInicio")} />
                    </Campo>
                  </div>
                  <div className="col-md-6">
                    <Campo id="fechaEvaluacion" label="Fecha de evaluación" error={errors.fechaEvaluacion?.message}>
                      <input type="date" className="form-control" {...register("fechaEvaluacion")} />
                    </Campo>
                  </div>
                </div>
                <Campo id="observaciones" label="Observaciones" error={errors.observaciones?.message}>
                  <textarea rows="4" className="form-control" {...register("observaciones")} />
                </Campo>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? "Guardando…" : "Guardar cambios"}
                </button>
              </div>
            </div>
          </form>

          <div className="card">
            <div className="card-body">
              <h2 className="h5">Estado de la solicitud</h2>
              <p className="text-secondary small">Cambiar el estado queda registrado en la trazabilidad.</p>
              {finalizada ? (
                <button type="button" className="btn btn-outline-primary" onClick={() => setConfirmar("pendiente")}>
                  Reabrir evaluación
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={() => setConfirmar("finalizada")}>
                  Marcar como finalizada
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
              <h2 className="h5">Trazabilidad</h2>
              <Timeline eventos={s.historial} />
            </div>
          </div>
        </div>
      </section>

      <ConfirmDialog
        abierto={confirmar !== null}
        titulo={confirmar === "finalizada" ? "Finalizar evaluación" : "Reabrir evaluación"}
        texto={confirmar === "finalizada"
          ? `Se marcará la solicitud ${s.id} como finalizada. Esta acción queda registrada.`
          : `La solicitud ${s.id} volverá a estado pendiente.`}
        etiquetaConfirmar={confirmar === "finalizada" ? "Finalizar" : "Reabrir"}
        onConfirmar={onCambiarEstado}
        onCerrar={() => setConfirmar(null)}
      />
    </>
  );
}
