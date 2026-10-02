// Modelo de Oferta
// Vienen del Excel: familiaCargo, cargo, ubicacion, unidad
// Propuestos:       id, vacantes, estado, fechaPublicacion, fechaCierre, descripcion, requisitos
// estado: "borrador" | "abierta" | "cerrada"  (solo "abierta" se muestra y permite postular)

const base = [
  { familiaCargo: "Supervisor B",         cargo: "Supervisor de Calidad Magallanes",     ubicacion: "Planta Magallanes",              unidad: "Industrial",        vacantes: 1 },
  { familiaCargo: "Profesional B C",      cargo: "Ingeniero Nuevas Tecnologías",         ubicacion: "Oficina Puerto Montt",           unidad: "Corporativo",       vacantes: 1 },
  { familiaCargo: "Administrativo",       cargo: "Administrativo Frigorífico",           ubicacion: "Planta Magallanes, Puerto Natales", unidad: "Industrial",     vacantes: 1 },
  { familiaCargo: "Técnico A",            cargo: "Técnico Mantención Senior",            ubicacion: "Piscicultura Reloncaví",         unidad: "Producción AD",     vacantes: 1 },
  { familiaCargo: "Jefatura",             cargo: "Jefe Control Producción",              ubicacion: "Planta Magallanes",              unidad: "Industrial",        vacantes: 1 },
  { familiaCargo: "Profesional B C",      cargo: "Veterinario",                          ubicacion: "Agua Mar Magallanes",            unidad: "Producción AM",     vacantes: 2 },
  { familiaCargo: "Supervisor B",         cargo: "Supervisor de Calidad",                ubicacion: "Planta Magallanes",              unidad: "Industrial",        vacantes: 3 },
  { familiaCargo: "Técnico B C",          cargo: "Asistente de Caldera",                 ubicacion: "Planta Alimento",                unidad: "Otros Producción",  vacantes: 1, estado: "cerrada" },
  { familiaCargo: "Técnico B C",          cargo: "Técnico Prevención de Riesgos",        ubicacion: "Planta Magallanes",              unidad: "Industrial",        vacantes: 2 },
  { familiaCargo: "Operario Calificado",  cargo: "Operador de Máquina",                  ubicacion: "Planta Cardonal",                unidad: "Industrial",        vacantes: 2 },
  { familiaCargo: "Profesional B C",      cargo: "Asistente de Operaciones",             ubicacion: "Quellón",                        unidad: "Industrial",        vacantes: 1 },
  { familiaCargo: "Profesional B C",      cargo: "Supervisor de Redes",                  ubicacion: "Puerto Cisnes",                  unidad: null,                vacantes: 1, estado: "borrador" },
  { familiaCargo: "Técnico B C",          cargo: "Técnico Prevención de Riesgos (Temporada)", ubicacion: "Planta Chonchi",            unidad: null,                vacantes: 1 },
  { familiaCargo: "Operario Calificado",  cargo: "Operador de Máquina",                  ubicacion: "Puerto Natales",                 unidad: null,                vacantes: 1 },
  { familiaCargo: "Profesional B C",      cargo: "Coordinador Frigorífico",              ubicacion: "Planta Quellón",                 unidad: "Industrial",        vacantes: 1 },
  { familiaCargo: "Técnico B C",          cargo: "Monitor de Calidad",                   ubicacion: "Planta Quellón",                 unidad: "Industrial",        vacantes: 2 },
  { familiaCargo: "Técnico B C",          cargo: "Técnico Mantenimiento Proceso",        ubicacion: "Puerto Natales",                 unidad: "Industrial",        vacantes: 1 },
  { familiaCargo: "Técnico B C",          cargo: "Técnico Mantención",                   ubicacion: "Hornopirén",                     unidad: "Producción AD",     vacantes: 1 },
  { familiaCargo: "Técnico A",            cargo: "Técnico Mantenimiento Senior",         ubicacion: "Planta Magallanes",              unidad: "Industrial",        vacantes: 1 },
];

export const ofertas = base.map((o, i) => ({
  id: i + 1,
  estado: "abierta",
  fechaPublicacion: "2026-09-28",
  fechaCierre: "2026-10-31",
  descripcion: "Descripción del cargo por completar.",
  requisitos: ["Requisitos por completar."],
  ...o,
}));
