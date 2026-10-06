// Datos iniciales de demostración (ficticios, solo desarrollo).
// Roles extensibles: agregar un rol nuevo es añadirlo a ROLES + matriz de permisos.
// No existe rol administrador: duda pendiente del documento base (docs/, § "Dudas").

export const ROLES = {
  ANALISTA: "analista",
  EVALUADOR: "evaluador",
};

export const ESTADOS = ["pendiente", "finalizada"];

// Contraseñas de desarrollo (ver README). Aquí solo el hash SHA-256.
export const USUARIOS = [
  {
    id: "u-ana",
    nombre: "Ana Karina Paredes",
    email: "analista@aquachile.test",
    passHash:
      "a8f3857819e30064eddcd74e3385bf8997e746dc9578cf7fd4cc0bfc9dd1028b",
    rol: ROLES.ANALISTA,
    cargo: "Analista de Reclutamiento",
  },
  {
    id: "u-eva",
    nombre: "Camila Soto Mella",
    email: "evaluador@aquachile.test",
    passHash:
      "7af7fda3d1e211162512335eeaeab64c5f84d730323880ac575aa9d9319fa26d",
    rol: ROLES.EVALUADOR,
    cargo: "Profesional Evaluador",
  },
];

export const CANDIDATOS = [
  { id: "c1", nombre: "Matías Ignacio Almonacid Ruiz", rut: "16.482.910-3", correo: "matias.almonacid.v@gmail.com", telefono: "+56984129942", fechaRegistro: "2026-09-28", creadoPor: "u-ana" },
  { id: "c2", nombre: "Valentina Barrientos Cárdenas", rut: "18.291.405-3", correo: "v.barrientos.c@gmail.com", telefono: "+56976451209", fechaRegistro: "2026-09-29", creadoPor: "u-ana" },
  { id: "c3", nombre: "Cristián Eduardo Oyarzún Vargas", rut: "15.482.144-9", correo: "cristian.oyarzun.v@gmail.com", telefono: "+56982347710", fechaRegistro: "2026-09-30", creadoPor: "u-ana" },
  { id: "c4", nombre: "Francisca Silva González", rut: "19.104.772-9", correo: "francisca.silva.g@gmail.com", telefono: "+56991238475", fechaRegistro: "2026-09-12", creadoPor: "u-ana" },
  { id: "c5", nombre: "Rodrigo Andrés Cárdenas Muñoz", rut: "14.930.551-3", correo: "rodrigo.cardenas.m@gmail.com", telefono: "+56965873214", fechaRegistro: "2026-10-01", creadoPor: "u-ana" },
  { id: "c6", nombre: "Carolina Mansilla Soto", rut: "17.654.321-3", correo: "carolina.mansilla.s@gmail.com", telefono: "+56977451923", fechaRegistro: "2026-09-10", creadoPor: "u-ana" },
  { id: "c7", nombre: "Gonzalo Vera Gallardo", rut: "16.112.890-2", correo: "gonzalo.vera.g@gmail.com", telefono: "+56969028347", fechaRegistro: "2026-10-02", creadoPor: "u-ana" },
];

const h = (fecha, actor, accion, detalle) => ({ fecha, actor, accion, detalle });

export const SOLICITUDES = [
  {
    id: "SOL-2026-001", candidatoId: "c1", puesto: "Jefe Centro Cultivo Mar",
    fechaCreacion: "2026-09-28", creadaPor: "u-ana", evaluadorId: "u-eva",
    evaluacion: { estado: "pendiente", fechaInicio: "2026-10-01", fechaEvaluacion: "", observaciones: "" },
    historial: [
      h("2026-09-28T10:15:00", "Ana Karina Paredes", "Solicitud creada", "Registro de candidato y solicitud de evaluación."),
      h("2026-09-28T10:15:00", "Sistema", "Evaluación asignada", "Asignada a Camila Soto Mella."),
      h("2026-10-01T09:00:00", "Camila Soto Mella", "Evaluación iniciada", "Fecha de inicio registrada."),
    ],
  },
  {
    id: "SOL-2026-002", candidatoId: "c2", puesto: "Supervisora Calidad Planta",
    fechaCreacion: "2026-09-29", creadaPor: "u-ana", evaluadorId: "u-eva",
    evaluacion: { estado: "pendiente", fechaInicio: "", fechaEvaluacion: "", observaciones: "" },
    historial: [
      h("2026-09-29T11:40:00", "Ana Karina Paredes", "Solicitud creada", "Registro de candidato y solicitud de evaluación."),
      h("2026-09-29T11:40:00", "Sistema", "Evaluación asignada", "Asignada a Camila Soto Mella."),
    ],
  },
  {
    id: "SOL-2026-003", candidatoId: "c3", puesto: "Técnico Mantención Frigorífico",
    fechaCreacion: "2026-09-30", creadaPor: "u-ana", evaluadorId: "u-eva",
    evaluacion: { estado: "pendiente", fechaInicio: "2026-10-02", fechaEvaluacion: "", observaciones: "" },
    historial: [
      h("2026-09-30T15:05:00", "Ana Karina Paredes", "Solicitud creada", "Registro de candidato y solicitud de evaluación."),
      h("2026-09-30T15:05:00", "Sistema", "Evaluación asignada", "Asignada a Camila Soto Mella."),
      h("2026-10-02T08:30:00", "Camila Soto Mella", "Evaluación iniciada", "Fecha de inicio registrada."),
    ],
  },
  {
    id: "SOL-2026-004", candidatoId: "c4", puesto: "Analista Datos Biomasa",
    fechaCreacion: "2026-09-12", creadaPor: "u-ana", evaluadorId: "u-eva",
    evaluacion: { estado: "finalizada", fechaInicio: "2026-09-15", fechaEvaluacion: "2026-09-20", observaciones: "Perfil recomendado para el cargo. Buena tolerancia al trabajo bajo presión y adherencia a protocolos de calidad." },
    historial: [
      h("2026-09-12T09:20:00", "Ana Karina Paredes", "Solicitud creada", "Registro de candidato y solicitud de evaluación."),
      h("2026-09-12T09:20:00", "Sistema", "Evaluación asignada", "Asignada a Camila Soto Mella."),
      h("2026-09-15T09:00:00", "Camila Soto Mella", "Evaluación iniciada", "Fecha de inicio registrada."),
      h("2026-09-20T16:45:00", "Camila Soto Mella", "Estado cambiado a finalizada", "Evaluación completada con observaciones."),
    ],
  },
  {
    id: "SOL-2026-005", candidatoId: "c5", puesto: "Patrón de Nave Mayor",
    fechaCreacion: "2026-10-01", creadaPor: "u-ana", evaluadorId: "u-eva",
    evaluacion: { estado: "pendiente", fechaInicio: "", fechaEvaluacion: "", observaciones: "" },
    historial: [
      h("2026-10-01T12:10:00", "Ana Karina Paredes", "Solicitud creada", "Registro de candidato y solicitud de evaluación."),
      h("2026-10-01T12:10:00", "Sistema", "Evaluación asignada", "Asignada a Camila Soto Mella."),
    ],
  },
  {
    id: "SOL-2026-006", candidatoId: "c6", puesto: "Médico Veterinario Salud Peces",
    fechaCreacion: "2026-09-10", creadaPor: "u-ana", evaluadorId: "u-eva",
    evaluacion: { estado: "finalizada", fechaInicio: "2026-09-11", fechaEvaluacion: "2026-09-18", observaciones: "Perfil apto con observaciones menores: reforzar inducción en protocolos de bioseguridad antes del ingreso a centro." },
    historial: [
      h("2026-09-10T08:50:00", "Ana Karina Paredes", "Solicitud creada", "Registro de candidato y solicitud de evaluación."),
      h("2026-09-10T08:50:00", "Sistema", "Evaluación asignada", "Asignada a Camila Soto Mella."),
      h("2026-09-11T09:00:00", "Camila Soto Mella", "Evaluación iniciada", "Fecha de inicio registrada."),
      h("2026-09-18T17:20:00", "Camila Soto Mella", "Estado cambiado a finalizada", "Evaluación completada con observaciones."),
    ],
  },
  {
    id: "SOL-2026-007", candidatoId: "c7", puesto: "Técnico Electromecánico Pontón",
    fechaCreacion: "2026-10-02", creadaPor: "u-ana", evaluadorId: "u-eva",
    evaluacion: { estado: "pendiente", fechaInicio: "", fechaEvaluacion: "", observaciones: "" },
    historial: [
      h("2026-10-02T14:30:00", "Ana Karina Paredes", "Solicitud creada", "Registro de candidato y solicitud de evaluación."),
      h("2026-10-02T14:30:00", "Sistema", "Evaluación asignada", "Asignada a Camila Soto Mella."),
    ],
  },
];

export const ESTADO_INICIAL = {
  usuarios: USUARIOS,
  candidatos: CANDIDATOS,
  solicitudes: SOLICITUDES,
};
