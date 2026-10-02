import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";

// Más adelante estos datos vendrán del backend
const indicadores = [
  { label: "Candidatos", value: 12 },
  { label: "Pendientes", value: 5 },
  { label: "En proceso", value: 4 },
  { label: "Finalizadas", value: 3 },
];

export default function Dashboard() {
  return (
    <>
      <section className="mb-4">
        <p className="text-secondary mb-1">Proyecto VcM · Full Stack II</p>
        <h1 className="h3">Gestión de Evaluaciones Psicolaborales</h1>
        <p className="text-secondary">Resumen general del proceso de evaluación.</p>
      </section>

      <section className="row g-3 mb-5">
        {indicadores.map((i) => <StatCard key={i.label} {...i} />)}
      </section>

      <section className="row g-4">
        <div className="col-md-6">
          <div className="card"><div className="card-body">
            <h2 className="h5">Candidatos</h2>
            <p>Consultar y registrar candidatos.</p>
            <Link to="/admin/candidatos" className="btn btn-primary">Ver candidatos</Link>
          </div></div>
        </div>
        <div className="col-md-6">
          <div className="card"><div className="card-body">
            <h2 className="h5">Solicitudes</h2>
            <p>Gestionar solicitudes de evaluación.</p>
            <Link to="/admin/solicitudes" className="btn btn-outline-primary">Ver solicitudes</Link>
          </div></div>
        </div>
      </section>
    </>
  );
}
