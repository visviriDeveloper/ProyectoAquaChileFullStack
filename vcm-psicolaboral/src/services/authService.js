// Autenticación (mock persistente). El backend real debe reemplazar este
// módulo manteniendo la misma interfaz: login, sesionActual, logout.
import { sha256Hex } from "../lib/crypto";
import { cargar, demora, CLAVE_SESION } from "./store";
import { ESTADO_INICIAL } from "../data/seed";

const sinSecreto = (u) => {
  const seguro = { ...u };
  delete seguro.passHash;
  return seguro;
};

export async function login(email, password) {
  await demora(600);
  const correo = String(email || "").trim().toLowerCase();
  const estado = cargar(ESTADO_INICIAL);
  const usuario = estado.usuarios.find((u) => u.email.toLowerCase() === correo);
  const hash = await sha256Hex(password || "");
  if (!usuario || usuario.passHash !== hash) {
    throw new Error("Correo o contraseña incorrectos.");
  }
  sessionStorage.setItem(
    CLAVE_SESION,
    JSON.stringify({ userId: usuario.id, inicio: new Date().toISOString() })
  );
  return sinSecreto(usuario);
}

export function sesionActual() {
  try {
    const crudo = sessionStorage.getItem(CLAVE_SESION);
    if (!crudo) return null;
    const { userId } = JSON.parse(crudo);
    const estado = cargar(ESTADO_INICIAL);
    const usuario = estado.usuarios.find((u) => u.id === userId);
    return usuario ? sinSecreto(usuario) : null;
  } catch {
    return null;
  }
}

export function logout() {
  sessionStorage.removeItem(CLAVE_SESION);
}
