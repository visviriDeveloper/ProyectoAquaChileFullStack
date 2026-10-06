# MVP AquaChile — Plan de implementación

> **Para ejecución:** inline en esta sesión, por coherencia del sistema visual (los
> sub-skills `subagent-driven-development` / `executing-plans` no están disponibles
> en este entorno).

**Goal:** Completar el MVP funcional (auth por roles, solicitudes, evaluación,
trazabilidad) manteniendo la estructura existente y elevando lo visual.

**Architecture:** Frontend-only funcional. La capa `services/` existente ya simula
latencia y anticipa un backend real (`ofertasService.js`). Se extiende ese patrón:
persistencia en `localStorage` + `sessionStorage`, contraseñas solo como hash
SHA-256 (WebCrypto), permisos verificados en la capa de servicios además de la UI.

**Tech Stack:** React 19 + Vite 8 + React Router 7 + Bootstrap 5 (se mantiene) +
react-hook-form + zod (se mantiene). Sin dependencias nuevas.

---

## 1. Modelo de datos

- `usuario { id, nombre, email, passHash, rol }` — `rol: "analista" | "evaluador"`
  (constante `ROLES` extensible; sin rol administrador por §2 del prompt).
- `candidato { id, nombre, rut, correo, telefono, fechaRegistro, creadoPor }`
- `solicitud { id, candidatoId, puesto, fechaCreacion, creadaPor, evaluadorId,
  evaluacion { estado: "pendiente"|"finalizada", fechaInicio, fechaEvaluacion,
  observaciones }, historial[] }`
- `historial[] { fecha, actor, accion, detalle }` — trazabilidad.

## 2. Rutas

Público (se mantiene): `/`, `/ofertas/:id`, `/ofertas/:id/postular`, `/login`.
App (`/app`, protegida): `index` dashboard, `solicitudes`, `solicitudes/nueva`
(solo analista), `solicitudes/:id` (detalle), `solicitudes/:id/evaluacion`
(solo evaluador), `ofertas` (solo analista, solo lectura, ya existe).
`/403` + `*`. Sin redirects legacy (app sin uso productivo).

## 3. Permisos (UI + servicios, no solo ocultar botones)

| Acción | Analista | Evaluador |
|---|---|---|
| crear candidato + solicitud | ✅ | ❌ (servicio lanza) |
| listar / ver detalle | todas | solo asignadas |
| registrar fechas/observaciones | ❌ | ✅ asignadas |
| cambiar estado pendiente↔finalizada | ❌ | ✅ asignadas + confirmación |

## 4. Archivos

Crear: `lib/crypto.js`, `data/seed.js`, `services/store.js`,
`services/authService.js`, `services/solicitudesService.js`,
`auth/AuthContext.jsx`, `auth/guards.jsx`, `components/feedback.jsx`
(toast, empty, skeleton, confirm `<dialog>`, breadcrumbs),
`components/forms.jsx` (Campo, EstadoBadge), `layouts/AppLayout.jsx`
(sidebar), `components/AppSidebar.jsx`, páginas `app/*`, `public/ForbiddenPage.jsx`,
`theme.css`.
Modificar: `App.jsx`, `main.jsx`, `index.css`, `index.html`, `LoginPage.jsx`,
`README.md`. Eliminar: `pages/admin/CandidatosPage.jsx` (fuera del MVP;
los candidatos se gestionan vía solicitudes).

## 5. Tareas

- [ ] Tema visual + tokens + index.html
- [ ] lib/store/seed + hashes + RUTs válidos
- [ ] authService + AuthContext + guards
- [ ] solicitudesService con permisos + historial
- [ ] feedback/forms/sidebar/AppLayout
- [ ] Login + Dashboard real + Solicitudes + Nueva + Detalle + Evaluación
- [ ] README (usuarios prueba, decisiones, estructura)
- [ ] Verificar: lint + build + screenshots 1440/390 + revisión rubric

## 6. Decisiones documentadas (mínimo necesario, no negocio nuevo)

- D1 Persistencia local en vez de backend: respeta "mantener estructura"; el
  servicio es el seam para el backend real.
- D2 Asignación automática al evaluador disponible (hoy 1 en seed); campo
  `evaluadorId` ya permite selector futuro.
- D3 Estado reversible pendiente↔finalizada con confirmación + historial.
- D4 `fechaInicio` y `fechaEvaluacion` separadas: ambas se mencionan en el doc.
- D5 RUT con validación módulo 11 (código ya existente); puesto con sugerencias
  del catálogo de ofertas existente (datalist).
- D6 `Ofertas` admin: solo lectura, solo analista ("consultar info del proceso").
- D7 Sesión en `sessionStorage` (cierra con la pestaña); sin "recordar" ni
  recuperación (no especificados).
