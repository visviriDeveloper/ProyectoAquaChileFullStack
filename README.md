# 🧠 VCM Psicolaboral

Plataforma integral para la gestión de ofertas de trabajo, postulaciones y administración de procesos de selección psicolaboral. 

Este proyecto está desarrollado con **React** y **Vite**, y cuenta con una arquitectura dividida en dos áreas principales: un portal público para postulantes y un panel de administración para reclutadores o psicólogos laborales.

---

## 🚀 Características Principales

### 🌐 Portal Público
* **Exploración de Ofertas:** Visualización del listado de ofertas laborales disponibles (`OfertasPage`).
* **Detalle de Ofertas:** Información completa de cada vacante (`OfertaDetallePage`).
* **Sistema de Postulación:** Formularios validados para el ingreso de antecedentes del candidato (`PostularPage`), con validación de RUT chileno.
* **Autenticación:** Acceso al sistema para usuarios registrados (`LoginPage`).

### 🔐 Panel de Administración (Admin)
* **Dashboard:** Vista general con métricas y estadísticas del sistema (`Dashboard`, `StatCard`).
* **Gestión de Ofertas:** Creación, edición y seguimiento de las vacantes activas (`OfertasAdminPage`).
* **Administración de Candidatos:** Revisión de perfiles y estados en el proceso de selección (`CandidatosPage`).
* **Solicitudes:** Control de los requerimientos de nuevas contrataciones (`SolicitudesPage`).

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** [React 18](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Enrutamiento:** [React Router DOM](https://reactrouter.com/)
* **Formularios:** [React Hook Form](https://react-hook-form.com/)
* **Validación de Esquemas:** [Zod](https://zod.dev/) + `@hookform/resolvers`
* **Estilos:** CSS estándar / CSS Modules (según configuración de `index.css` y `App.css`)

---

## ⚙️ Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Ingresar al directorio del proyecto:**
   ```bash
   cd vcm-psicolaboral
   ```

3. **Instalar las dependencias base:**
   ```bash
   npm install
   ```

4. **Instalar las dependencias específicas de enrutamiento y formularios (requerido):**
   ```bash
   npm install react-router-dom react-hook-form zod @hookform/resolvers
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible típicamente en `http://localhost:5173/` (Vite te indicará el puerto exacto en la terminal).

---

## 📂 Estructura del Proyecto

El código fuente principal se encuentra en el directorio `/src`:

```text
src/
├── components/        # Componentes reutilizables (Navbar, Cards de Ofertas, etc.)
├── data/              # Datos simulados (mocks) para desarrollo local
├── layouts/           # Plantillas maestras (AdminLayout, PublicLayout)
├── lib/               # Utilidades y funciones de ayuda (ej. validador de RUT)
├── pages/
│   ├── admin/         # Vistas protegidas para administradores
│   └── public/        # Vistas accesibles para cualquier visitante
├── services/          # Integración con APIs y lógica de negocio (ofertasService)
├── App.jsx            # Componente raíz y configuración global
└── main.jsx           # Punto de entrada de la aplicación
```

---

## 📜 Licencia

Este proyecto es de uso privado. Todos los derechos reservados.