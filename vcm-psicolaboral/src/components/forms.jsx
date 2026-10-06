import { Children, cloneElement } from "react";

// Campo accesible: asocia label, hint y error al control vía ids.
// Si el hijo es un control directo (input/textarea/select) se le inyecta el
// id; si es un envoltorio (ej. input-group), el input interno debe traer su
// propio id igual al de este Campo.
const CONTROLES = ["input", "textarea", "select"];

export function Campo({ id, label, error, hint, children }) {
  const desc = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  const hijo = Children.only(children);
  const esDirecto = typeof hijo.type === "string" && CONTROLES.includes(hijo.type);
  const control = esDirecto
    ? cloneElement(hijo, { id, "aria-describedby": desc, "aria-invalid": error ? true : undefined })
    : hijo;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      {control}
      {hint && !error && <div id={`${id}-hint`} className="form-text">{hint}</div>}
      {error && <div id={`${id}-err`} className="text-danger small mt-1" role="alert">{error}</div>}
    </div>
  );
}

// Badge de estado: punto + texto (nunca solo color).
export function EstadoBadge({ estado }) {
  const etiqueta = estado === "finalizada" ? "Finalizada" : "Pendiente";
  return <span className={`badge-estado badge-${estado}`}>{etiqueta}</span>;
}
