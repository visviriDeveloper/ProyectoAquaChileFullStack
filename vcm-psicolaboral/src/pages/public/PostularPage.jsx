import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getOferta, postular } from "../../services/ofertasService";
import { validarRut } from "../../lib/rut";

const MAX_MB = 5;

const schema = z.object({
  nombre: z.string().min(3, "Ingresa tu nombre completo"),
  rut: z.string().refine(validarRut, "RUT inválido"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().regex(/^\+?\d{8,12}$/, "Teléfono inválido (solo números, ej. +56912345678)"),
  cv: z.any()
    .refine((f) => f?.length === 1, "Adjunta tu CV")
    .refine((f) => !f?.[0] || f[0].type === "application/pdf", "El CV debe ser un PDF")
    .refine((f) => !f?.[0] || f[0].size <= MAX_MB * 1024 * 1024, `El CV no puede superar ${MAX_MB} MB`),
  mensaje: z.string().max(500, "Máximo 500 caracteres").optional(),
  consentimiento: z.boolean().refine((v) => v === true, "Debes aceptar el tratamiento de tus datos"),
  web: z.string().max(0).optional(), // honeypot: debe quedar vacío
});

function Campo({ label, error, children }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      {children}
      {error && <div className="text-danger small mt-1">{error.message}</div>}
    </div>
  );
}

export default function PostularPage() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const [errorOferta, setErrorOferta] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getOferta(id).then(setOferta).catch(() => setErrorOferta(true));
  }, [id]);

  const onSubmit = async (datos) => {
    if (datos.web) return; // bot detectado
    setErrorEnvio(null);
    try {
      await postular(id, datos);
      setEnviado(true);
    } catch (e) {
      setErrorEnvio(e.message);
    }
  };

  if (errorOferta) return (
    <div className="alert alert-warning">Esta oferta ya no está disponible. <Link to="/">Ver otras ofertas</Link></div>
  );
  if (!oferta) return <p>Cargando…</p>;

  if (enviado) return (
    <div className="col-lg-6">
      <h1 className="h3">Postulación recibida</h1>
      <p>Recibimos tu postulación a <strong>{oferta.cargo}</strong>. Si tu perfil avanza, te contactaremos por correo.</p>
      <Link to="/" className="btn btn-primary">Ver otras ofertas</Link>
    </div>
  );

  return (
    <div className="col-lg-6">
      <Link to={`/ofertas/${oferta.id}`} className="small">← Volver al detalle</Link>
      <h1 className="h3 mt-2">Postular a {oferta.cargo}</h1>
      <p className="text-secondary">{oferta.ubicacion}</p>

      {errorEnvio && <div className="alert alert-danger">{errorEnvio}</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Campo label="Nombre completo" error={errors.nombre}>
          <input className="form-control" {...register("nombre")} />
        </Campo>
        <Campo label="RUT" error={errors.rut}>
          <input className="form-control" placeholder="12.345.678-5" {...register("rut")} />
        </Campo>
        <Campo label="Correo electrónico" error={errors.correo}>
          <input type="email" className="form-control" {...register("correo")} />
        </Campo>
        <Campo label="Teléfono" error={errors.telefono}>
          <input className="form-control" placeholder="+56912345678" {...register("telefono")} />
        </Campo>
        <Campo label={`CV en PDF (máx. ${MAX_MB} MB)`} error={errors.cv}>
          <input type="file" accept="application/pdf" className="form-control" {...register("cv")} />
        </Campo>
        <Campo label="Mensaje (opcional)" error={errors.mensaje}>
          <textarea rows="3" className="form-control" {...register("mensaje")} />
        </Campo>

        {/* Honeypot: oculto para personas, los bots lo llenan */}
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: "absolute", left: "-9999px" }} {...register("web")} />

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="consentimiento" {...register("consentimiento")} />
          <label htmlFor="consentimiento" className="form-check-label">
            Acepto el tratamiento de mis datos personales para este proceso de selección.
          </label>
          {errors.consentimiento && <div className="text-danger small mt-1">{errors.consentimiento.message}</div>}
        </div>

        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Enviando…" : "Enviar postulación"}
        </button>
      </form>
    </div>
  );
}
