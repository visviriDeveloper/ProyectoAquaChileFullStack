import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../auth/useAuth";
import { crearSolicitud } from "../../services/solicitudesService";
import { validarRut } from "../../lib/rut";
import { ofertas } from "../../data/ofertas";
import { Breadcrumbs } from "../../components/feedback";
import { useToast } from "../../components/toast";
import { Campo } from "../../components/forms";

const schema = z.object({
  nombre: z.string().min(3, "Ingresa el nombre completo"),
  rut: z.string().refine(validarRut, "RUT inválido"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().regex(/^\+?\d{8,12}$/, "Teléfono inválido (solo números, ej. +56912345678)"),
  puesto: z.string().min(3, "Indica el puesto al que postula"),
});

export default function NuevaSolicitudPage() {
  const { usuario } = useAuth();
  const { avisar } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (datos) => {
    setError(null);
    try {
      const s = await crearSolicitud(usuario, datos);
      avisar(`Candidato registrado. Solicitud ${s.id} creada.`);
      navigate(`/app/solicitudes/${s.id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Breadcrumbs items={[{ to: "/app", label: "Inicio" }, { to: "/app/solicitudes", label: "Solicitudes" }, { label: "Nueva" }]} />
      <section className="page-head">
        <h1>Registrar candidato</h1>
        <p>Ingresa la información personal y el puesto. Al guardar se crea la solicitud de evaluación.</p>
      </section>

      <div className="col-lg-7">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="h5">Información personal</h2>
              <Campo id="nombre" label="Nombre completo *" error={errors.nombre?.message}>
                <input className="form-control" autoComplete="name" {...register("nombre")} />
              </Campo>
              <Campo id="rut" label="RUT *" error={errors.rut?.message}>
                <input className="form-control mono" placeholder="12.345.678-5" {...register("rut")} />
              </Campo>
              <div className="row">
                <div className="col-md-6">
                  <Campo id="correo" label="Correo electrónico *" error={errors.correo?.message}>
                    <input type="email" className="form-control" autoComplete="email" {...register("correo")} />
                  </Campo>
                </div>
                <div className="col-md-6">
                  <Campo id="telefono" label="Teléfono *" error={errors.telefono?.message}>
                    <input className="form-control mono" placeholder="+56912345678" {...register("telefono")} />
                  </Campo>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h2 className="h5">Postulación</h2>
              <Campo id="puesto" label="Puesto al que postula *" error={errors.puesto?.message}>
                <input className="form-control" list="puestos" {...register("puesto")} />
              </Campo>
              <datalist id="puestos">
                {[...new Set(ofertas.map((o) => o.cargo))].map((p) => <option key={p} value={p} />)}
              </datalist>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? "Registrando…" : "Registrar candidato"}
            </button>
            <Link to="/app/solicitudes" className="btn btn-outline-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </>
  );
}
