import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1 className="h3">Página no encontrada</h1>
      <p><Link to="/">Volver a las ofertas</Link></p>
    </div>
  );
}
