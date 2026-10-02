import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

// 1. Definimos el esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Debes ingresar un correo electrónico válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function LoginPage() {
  const navigate = useNavigate();

  // 2. Inicializamos React Hook Form con el resolver de Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 3. Lógica Placeholder para transicionar al Admin
  const onSubmit = (data) => {
    // Simulamos la validación de los dos roles del proyecto AquaChile
    if (data.email === "admin@aquachile.cl" && data.password === "123456") {
      localStorage.setItem("rolActivo", "Analista de Reclutamiento");
      navigate("/admin");
    } else if (data.email === "evaluador@aquachile.cl" && data.password === "123456") {
      localStorage.setItem("rolActivo", "Profesional Evaluador");
      navigate("/admin");
    } else {
      alert("Credenciales incorrectas.\n\nPrueba con:\n- admin@aquachile.cl\n- evaluador@aquachile.cl\n\nClave: 123456");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>
        
        {/* Formulario conectado al handleSubmit de React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              // Agregamos la clase is-invalid de Bootstrap si hay un error en este campo
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="usuario@aquachile.cl"
              {...register("email")}
            />
            {/* Mensaje de error de Zod */}
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-medium">Contraseña</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="******"
              {...register("password")}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Ingresar a RRHH
          </button>
        </form>

        {/* Placeholder de ayuda para probar el MVP */}
        <div className="mt-4 p-3 bg-light border rounded text-muted small">
          <strong>Datos de prueba (MVP):</strong>
          <ul className="mb-0 mt-1 ps-3">
            <li><code>admin@aquachile.cl</code> (Analista)</li>
            <li><code>evaluador@aquachile.cl</code> (Evaluador)</li>
            <li>Clave: <code>123456</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}