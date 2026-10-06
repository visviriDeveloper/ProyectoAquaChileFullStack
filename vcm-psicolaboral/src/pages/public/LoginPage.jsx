import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../auth/useAuth";
import { useToast } from "../../components/toast";
import { Campo } from "../../components/forms";

const schema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export default function LoginPage() {
  const { usuario, entrar } = useAuth();
  const { avisar } = useToast();
  const navigate = useNavigate();
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  if (usuario) return <Navigate to="/app" replace />;

  const onSubmit = async ({ email, password }) => {
    setError(null);
    try {
      const u = await entrar(email, password);
      avisar(`Sesión iniciada. Bienvenido, ${u.nombre.split(" ")[0]}.`);
      navigate("/app");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <p className="text-secondary small mb-1">VcM Psicolaboral · AquaChile</p>
        <h1>Iniciar sesión</h1>
        <p className="text-secondary">Acceso para Analista de Reclutamiento y Profesional Evaluador.</p>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Campo id="email" label="Correo electrónico" error={errors.email?.message}>
            <input type="email" autoComplete="username" className="form-control" {...register("email")} />
          </Campo>
          <Campo id="password" label="Contraseña" error={errors.password?.message}>
            <div className="input-group">
              <input
                id="password"
                type={verClave ? "text" : "password"}
                autoComplete="current-password"
                className="form-control"
                aria-describedby={errors.password ? "password-err" : undefined}
                aria-invalid={errors.password ? true : undefined}
                {...register("password")}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                aria-pressed={verClave}
                aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setVerClave(!verClave)}
              >
                {verClave ? "Ocultar" : "Ver"}
              </button>
            </div>
          </Campo>
          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? "Verificando…" : "Iniciar sesión"}
          </button>
        </form>

        <details className="mt-3">
          <summary className="small">Usuarios de demostración</summary>
          <ul className="small text-secondary mt-2 mb-0">
            <li><span className="mono">analista@aquachile.test</span> · Analista-2026*</li>
            <li><span className="mono">evaluador@aquachile.test</span> · Evaluador-2026*</li>
          </ul>
        </details>
      </div>
    </div>
  );
}
