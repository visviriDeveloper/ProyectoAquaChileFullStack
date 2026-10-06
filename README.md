# ProyectoAquaChileFullStack — VcM Psicolaboral (MVP)

Plataforma de reclutamiento y evaluación psicolaboral para AquaChile
(asignatura Full Stack II, 2026). Documento base de requisitos:
`docs/Actividad_Bases_MVP_AquaChile_DSY1104.docx` (fuente de verdad del negocio)
y decisiones de implementación en `docs/plans/2026-10-05-mvp-psicolaboral.md`.

## Objetivo

MVP funcional (no mockup) que permite: iniciar/cerrar sesión por rol, registrar
candidatos + solicitud de evaluación, listar/filtrar solicitudes, ver el detalle
con trazabilidad, registrar la evaluación (fechas + observaciones) y cambiar su
estado entre `pendiente` y `finalizada`.

## Tecnologías

- Frontend: React 19 + Vite 8 + React Router 7 + Bootstrap 5 + react-hook-form + zod.
- Sin backend real en el MVP: la capa `src/services/` simula latencia y persiste
  en `localStorage` (`vcm.mvp.v1`) con sesión en `sessionStorage`. Está diseñada
  como punto de reemplazo por una API real sin tocar las páginas.
- Sin dependencias agregadas respecto al proyecto base.

## Requisitos

- Node.js 20+ y npm.

## Instalación y ejecución

```powershell
cd vcm-psicolaboral
npm install
npm run dev      # http://localhost:5173
npm run lint     # verificación
npm run build    # compilado de producción
```

No hay variables de entorno. No hay base de datos que instalar: los datos
iniciales (`src/data/seed.js`) se cargan automáticamente al primer uso. Para
reiniciar la demo, borra el `localStorage` del navegador.

## Usuarios de prueba (desarrollo, ficticios)

| Rol | Correo | Contraseña |
|---|---|---|
| Analista de Reclutamiento | `analista@aquachile.test` | `Analista-2026*` |
| Profesional Evaluador | `evaluador@aquachile.test` | `Evaluador-2026*` |

Las contraseñas se guardan solo como hash SHA-256 (WebCrypto), nunca en texto
plano. Todos los datos de personas son ficticios.

## Estructura (`vcm-psicolaboral/src/`)

- `auth/` — `AuthContext`, `useAuth`, guards `RequireAuth`/`RequireRole`.
- `components/` — `AppSidebar`, `feedback` (toasts, empty states, skeletons,
  confirmación, breadcrumbs, timeline), `forms` (Campo, EstadoBadge), tarjetas.
- `data/` — `ofertas.js` (catálogo público), `seed.js` (usuarios, candidatos,
  solicitudes con historial).
- `layouts/` — `PublicLayout` (portal) y `AppLayout` (shell con sidebar).
- `lib/` — `rut.js` (validación módulo 11), `crypto.js` (SHA-256), `fechas.js`.
- `pages/public/` — ofertas, detalle, postulación, login, 403/404.
- `pages/app/` — dashboard, solicitudes, nueva solicitud, detalle, evaluación.
- `services/` — `ofertasService`, `authService`, `solicitudesService` (con
  control de permisos), `store` (persistencia).
- `theme.css` — sistema visual (tokens + componentes).

## Roles y permisos

| Acción | Analista | Evaluador |
|---|---|---|
| Registrar candidato + crear solicitud | ✅ | ❌ |
| Listar / buscar / filtrar / ver detalle | todas | solo asignadas |
| Registrar fechas y observaciones | ❌ | ✅ asignadas |
| Cambiar estado pendiente ↔ finalizada | ❌ | ✅ asignadas (con confirmación) |
| Ofertas (catálogo, solo lectura) | ✅ | ❌ |

Los permisos se verifican en los servicios además de la UI y cada cambio queda
en el historial de la solicitud (trazabilidad). No existe rol administrador
(duda pendiente del documento base); `ROLES` en `seed.js` es extensible.

## Decisiones mínimas documentadas

D1 Persistencia local en vez de backend (respeta la estructura existente).
D2 Asignación automática al evaluador disponible (campo `evaluadorId` permite
selector futuro). D3 Estado reversible con confirmación + historial. D4
`fechaInicio` y `fechaEvaluacion` separadas (ambas aparecen en el documento).
D5 RUT validado + puesto con sugerencias del catálogo existente. D6 Ofertas
admin en solo lectura para el Analista. D7 Sesión en `sessionStorage`.

## Otros archivos

- `vistaAdmin/index.html` — mockup de referencia visual (no es código productivo;
  contiene credenciales ficticias en claro, no usar).
