import { ofertas } from "../data/ofertas";
import { limpiarRut } from "../lib/rut";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// Público: solo ofertas abiertas
export async function getOfertas() {
  await delay();
  return ofertas.filter((o) => o.estado === "abierta");
}

export async function getOferta(id) {
  await delay();
  const o = ofertas.find((x) => x.id === Number(id));
  if (!o || o.estado !== "abierta") throw new Error("Oferta no disponible");
  return o;
}

// Admin: todas
export async function getOfertasAdmin() {
  await delay();
  return ofertas;
}

// Postulación (mock). El backend real debe rechazar oferta + RUT duplicados.
const postulaciones = new Set();
export async function postular(ofertaId, datos) {
  await delay(600);
  const clave = `${ofertaId}-${limpiarRut(datos.rut)}`;
  if (postulaciones.has(clave)) throw new Error("Ya postulaste a esta oferta con este RUT.");
  postulaciones.add(clave);
  // Futuro: api.post(`/ofertas/${ofertaId}/postulaciones`, formData /* multipart con el CV */)
  return { ok: true };
}
