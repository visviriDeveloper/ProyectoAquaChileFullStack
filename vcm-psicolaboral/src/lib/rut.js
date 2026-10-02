export const limpiarRut = (rut = "") => rut.replace(/[^0-9kK]/g, "").toUpperCase();

// Validación módulo 11
export function validarRut(rut) {
  const c = limpiarRut(rut);
  if (c.length < 2) return false;
  const cuerpo = c.slice(0, -1);
  const dv = c.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;
  let suma = 0, mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const r = 11 - (suma % 11);
  const esperado = r === 11 ? "0" : r === 10 ? "K" : String(r);
  return dv === esperado;
}
