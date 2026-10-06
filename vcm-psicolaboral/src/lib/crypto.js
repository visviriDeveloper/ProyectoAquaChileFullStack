// SHA-256 con WebCrypto. Las contraseñas nunca se guardan ni comparan
// en texto plano: solo se almacena y coteja el hash hexadecimal.
export async function sha256Hex(texto) {
  const bytes = new TextEncoder().encode(String(texto));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
