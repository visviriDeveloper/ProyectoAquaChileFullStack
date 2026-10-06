import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fechaHora } from "../lib/fechas";
import { ToastContext } from "./toast";

// ---- Toasts (solo confirmaciones; los errores van inline con role="alert") ----

export function ToastProvider({ children }) {
  const [avisos, setAvisos] = useState([]);
  const avisar = useCallback((texto) => {
    const id = Date.now() + Math.random();
    setAvisos((prev) => [...prev, { id, texto }]);
    setTimeout(() => setAvisos((prev) => prev.filter((a) => a.id !== id)), 4500);
  }, []);
  return (
    <ToastContext.Provider value={{ avisar }}>
      {children}
      <div className="toasts" aria-live="polite" aria-atomic="true">
        {avisos.map((a) => (
          <div key={a.id} className="toast-msg">{a.texto}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ---- Estado vacío ----
export function EmptyState({ titulo, texto, children }) {
  return (
    <div className="empty">
      <h2 className="h5">{titulo}</h2>
      <p className="mb-0">{texto}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

// ---- Carga: anuncio para lector + skeletons visuales ----
export function Cargando({ texto = "Cargando…" }) {
  return (
    <div>
      <p role="status">{texto}</p>
      <div aria-hidden="true" className="d-grid gap-2">
        <div className="skeleton" style={{ height: "3rem" }} />
        <div className="skeleton" style={{ height: "3rem" }} />
        <div className="skeleton" style={{ height: "3rem" }} />
      </div>
    </div>
  );
}

// ---- Error recuperable ----
export function ErrorCarga({ texto, onReintentar }) {
  return (
    <div className="alert alert-danger" role="alert">
      {texto}{" "}
      {onReintentar && (
        <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}

// ---- Confirmación con <dialog> nativo (foco entra y vuelve al disparador) ----
export function ConfirmDialog({ abierto, titulo, texto, etiquetaConfirmar = "Confirmar", onConfirmar, onCerrar }) {
  const ref = useRef(null);
  const previo = useRef(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (abierto) {
      previo.current = document.activeElement;
      dlg.showModal();
      dlg.querySelector("button[value='ok']")?.focus();
    } else if (dlg.open) {
      dlg.close();
      previo.current?.focus?.();
    }
  }, [abierto ]);

  return (
    <dialog ref={ref} className="confirm" aria-labelledby="confirm-titulo" onClose={onCerrar}>
      <h2 id="confirm-titulo" className="h5">{titulo}</h2>
      <p>{texto}</p>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-outline-secondary" value="cancel" onClick={onCerrar}>
          Cancelar
        </button>
        <button type="button" className="btn btn-primary" value="ok" onClick={onConfirmar}>
          {etiquetaConfirmar}
        </button>
      </div>
    </dialog>
  );
}

// ---- Línea de tiempo de trazabilidad ----
export function Timeline({ eventos }) {
  if (!eventos?.length) return <p className="text-secondary mb-0">Sin movimientos registrados.</p>;
  return (
    <ol className="timeline">
      {eventos.map((e, i) => (
        <li key={`${e.fecha}-${i}`}>
          <div><strong>{e.accion}</strong></div>
          {e.detalle && <div className="text-secondary small">{e.detalle}</div>}
          <time dateTime={e.fecha}>{fechaHora(e.fecha)} · {e.actor}</time>
        </li>
      ))}
    </ol>
  );
}

// ---- Breadcrumbs ----
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Ruta de navegación" className="crumbs">
      <ol className="breadcrumb mb-0">
        {items.map((it, i) => (
          <li key={it.label} className="breadcrumb-item" aria-current={i === items.length - 1 ? "page" : undefined}>
            {it.to && i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : it.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
