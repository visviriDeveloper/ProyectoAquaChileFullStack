// Solicitudes y evaluaciones. Los permisos se verifican aquí (lógica de
// aplicación), no solo ocultando botones: cada función recibe el actor y
// lanza si el rol no está autorizado.
import { cargar, guardar, demora } from "./store";
import { ESTADO_INICIAL, ROLES, ESTADOS } from "../data/seed";
import { limpiarRut } from "../lib/rut";

function exigirRol(actor, roles, accion = "realizar esta acción") {
  if (!actor || !roles.includes(actor.rol)) {
    throw new Error(`No tienes permiso para ${accion}.`);
  }
}

const porId = (lista, id) => lista.find((x) => x.id === id);
const unir = (estado, s) => ({
  ...s,
  candidato: porId(estado.candidatos, s.candidatoId),
  creadoPorNombre: porId(estado.usuarios, s.creadaPor)?.nombre ?? "—",
  evaluadorNombre: porId(estado.usuarios, s.evaluadorId)?.nombre ?? "Sin asignar",
});

function visiblePara(actor, solicitud) {
  if (actor.rol === ROLES.ANALISTA) return true;
  return solicitud.evaluadorId === actor.id;
}

function registrar(estado, solicitud, actor, accion, detalle) {
  solicitud.historial = [
    ...(solicitud.historial || []),
    {
      fecha: new Date().toISOString(),
      actor: actor.nombre,
      accion,
      detalle,
    },
  ];
  guardar(estado);
}

export async function listarSolicitudes(actor, { texto = "", estado = "" } = {}) {
  exigirRol(actor, [ROLES.ANALISTA, ROLES.EVALUADOR], "consultar solicitudes");
  await demora();
  const datos = cargar(ESTADO_INICIAL);
  const q = texto.trim().toLowerCase();
  return datos.solicitudes
    .filter((s) => visiblePara(actor, s))
    .map((s) => unir(datos, s))
    .filter(
      (s) =>
        (!estado || s.evaluacion.estado === estado) &&
        (!q ||
          s.id.toLowerCase().includes(q) ||
          s.puesto.toLowerCase().includes(q) ||
          s.candidato.nombre.toLowerCase().includes(q) ||
          limpiarRut(s.candidato.rut).includes(limpiarRut(q)))
    )
    .sort((a, b) => (a.fechaCreacion < b.fechaCreacion ? 1 : -1));
}

export async function obtenerSolicitud(actor, id) {
  exigirRol(actor, [ROLES.ANALISTA, ROLES.EVALUADOR], "consultar solicitudes");
  await demora();
  const datos = cargar(ESTADO_INICIAL);
  const s = porId(datos.solicitudes, id);
  if (!s || !visiblePara(actor, s)) throw new Error("Solicitud no encontrada.");
  return unir(datos, s);
}

// Crea candidato + solicitud en una sola operación (interfaz única del MVP).
export async function crearSolicitud(actor, { nombre, rut, correo, telefono, puesto }) {
  exigirRol(actor, [ROLES.ANALISTA], "registrar candidatos");
  await demora(600);
  const datos = cargar(ESTADO_INICIAL);
  const rutLimpio = limpiarRut(rut);
  if (datos.candidatos.some((c) => limpiarRut(c.rut) === rutLimpio)) {
    throw new Error("Este RUT ya tiene una solicitud registrada.");
  }
  const evaluador = datos.usuarios.find((u) => u.rol === ROLES.EVALUADOR);
  const num = Math.max(0, ...datos.solicitudes.map((s) => Number(s.id.split("-").pop()))) + 1;
  const id = `SOL-2026-${String(num).padStart(3, "0")}`;
  const hoy = new Date().toISOString().slice(0, 10);
  const candidatoId = `c-${Date.now()}`;
  datos.candidatos.push({
    id: candidatoId,
    nombre: nombre.trim(),
    rut: rut.trim(),
    correo: correo.trim(),
    telefono: telefono.trim(),
    fechaRegistro: hoy,
    creadoPor: actor.id,
  });
  const solicitud = {
    id,
    candidatoId,
    puesto: puesto.trim(),
    fechaCreacion: hoy,
    creadaPor: actor.id,
    evaluadorId: evaluador ? evaluador.id : null,
    evaluacion: { estado: "pendiente", fechaInicio: "", fechaEvaluacion: "", observaciones: "" },
    historial: [],
  };
  datos.solicitudes.push(solicitud);
  registrar(datos, solicitud, actor, "Solicitud creada", "Registro de candidato y solicitud de evaluación.");
  if (evaluador) {
    registrar(datos, solicitud, { nombre: "Sistema" }, "Evaluación asignada", `Asignada a ${evaluador.nombre}.`);
  }
  return unir(datos, solicitud);
}

export async function registrarEvaluacion(actor, id, { fechaInicio, fechaEvaluacion, observaciones }) {
  exigirRol(actor, [ROLES.EVALUADOR], "registrar evaluaciones");
  await demora(600);
  const datos = cargar(ESTADO_INICIAL);
  const s = porId(datos.solicitudes, id);
  if (!s || !visiblePara(actor, s)) throw new Error("Solicitud no encontrada.");
  const antes = s.evaluacion.fechaInicio;
  s.evaluacion = {
    ...s.evaluacion,
    fechaInicio: fechaInicio || "",
    fechaEvaluacion: fechaEvaluacion || "",
    observaciones: (observaciones || "").trim(),
  };
  if (fechaInicio && !antes) {
    registrar(datos, s, actor, "Evaluación iniciada", "Fecha de inicio registrada.");
  } else {
    registrar(datos, s, actor, "Evaluación actualizada", "Información de la evaluación registrada.");
  }
  return unir(datos, s);
}

export async function cambiarEstado(actor, id, estado) {
  exigirRol(actor, [ROLES.EVALUADOR], "cambiar el estado de la evaluación");
  if (!ESTADOS.includes(estado)) throw new Error("Estado no válido.");
  await demora(600);
  const datos = cargar(ESTADO_INICIAL);
  const s = porId(datos.solicitudes, id);
  if (!s || !visiblePara(actor, s)) throw new Error("Solicitud no encontrada.");
  if (s.evaluacion.estado === estado) return unir(datos, s);
  s.evaluacion.estado = estado;
  registrar(datos, s, actor, `Estado cambiado a ${estado}`, estado === "finalizada" ? "Evaluación completada." : "Evaluación reabierta.");
  return unir(datos, s);
}
