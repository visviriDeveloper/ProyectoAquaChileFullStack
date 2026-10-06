export const fechaCorta = (iso) => {
  if (!iso) return "—";
  const d = new Date(String(iso).length <= 10 ? `${iso}T00:00` : iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("es-CL");
};

export const fechaHora = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : `${d.toLocaleDateString("es-CL")} ${d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}`;
};
