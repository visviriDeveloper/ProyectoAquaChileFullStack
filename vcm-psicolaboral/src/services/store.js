// Clave versionada: cambiar la versión reinicia los datos de demostración.
export const CLAVE_DATOS = "vcm.mvp.v1";
export const CLAVE_SESION = "vcm.mvp.sesion";

export const demora = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export function cargar(estadoInicial) {
  try {
    const crudo = localStorage.getItem(CLAVE_DATOS);
    if (!crudo) {
      localStorage.setItem(CLAVE_DATOS, JSON.stringify(estadoInicial));
      return structuredClone(estadoInicial);
    }
    return JSON.parse(crudo);
  } catch {
    return structuredClone(estadoInicial);
  }
}

export function guardar(estado) {
  localStorage.setItem(CLAVE_DATOS, JSON.stringify(estado));
}

export function restablecer(estadoInicial) {
  localStorage.setItem(CLAVE_DATOS, JSON.stringify(estadoInicial));
  sessionStorage.removeItem(CLAVE_SESION);
}
