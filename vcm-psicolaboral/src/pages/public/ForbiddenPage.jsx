import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="col-lg-6">
      <h1 className="h3">Sin permiso</h1>
      <p className="text-secondary">
        Tu rol no tiene acceso a esta sección. Si necesitas acceso, contacta al
        equipo de reclutamiento.
      </p>
      <Link to="/app" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}
