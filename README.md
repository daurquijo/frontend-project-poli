# ServyTech — Plataforma de Servicios Digitales

Aplicación web tipo catálogo desarrollada como proyecto académico para el módulo de **Desarrollo de Front-End** en el Politécnico Grancolombiano (Entrega 3 — Semana 7).

Permite a los usuarios explorar servicios digitales, guardar favoritos, buscar y filtrar por categoría, completar un formulario de contacto y administrar el catálogo (crear y eliminar servicios).

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.3 | Framework UI, componentes y estado |
| Vite | 6.0 | Bundler y servidor de desarrollo |
| Tailwind CSS | 3.4 | Estilos utilitarios |
| React Router v6 | 6.28 | Navegación SPA (HashRouter) |
| localStorage | — | Persistencia de servicios y favoritos |

---

## Estructura de carpetas

```
src/
├── context/
│   ├── ServicesContext.jsx   # Estado global del catálogo de servicios
│   └── FavoritesContext.jsx  # Estado global de favoritos del usuario
├── components/
│   ├── Header.jsx            # Barra de navegación principal
│   ├── Footer.jsx            # Pie de página
│   ├── SearchBar.jsx         # Campo de búsqueda reutilizable
│   └── ServiceCard.jsx       # Tarjeta de servicio (indicador de favorito)
├── pages/
│   ├── Home.jsx              # Inicio con servicios destacados dinámicos
│   ├── Services.jsx          # Catálogo con búsqueda y filtro por categoría
│   ├── ServiceDetail.jsx     # Vista detallada de un servicio
│   ├── Favorites.jsx         # Lista de favoritos del usuario
│   ├── Contact.jsx           # Formulario de contacto con validaciones
│   ├── About.jsx             # Información del equipo y tecnologías
│   ├── Admin.jsx             # Panel CRUD (crear y eliminar servicios)
│   └── NotFound.jsx          # Página 404
└── data/
    └── services.json         # 10 servicios iniciales del catálogo
```

---

## Rutas disponibles

| Ruta | Página |
|---|---|
| `/#/` | Inicio |
| `/#/servicios` | Catálogo de servicios |
| `/#/servicios/:id` | Detalle de un servicio |
| `/#/favoritos` | Favoritos del usuario |
| `/#/contactanos` | Formulario de contacto |
| `/#/acerca-de` | Información del proyecto |
| `/#/admin` | Panel de administración |

> Las rutas usan `#` (HashRouter) para compatibilidad con GitHub Pages.

---

## Persistencia de datos

El estado se guarda automáticamente en `localStorage` del navegador:

| Clave | Contenido |
|---|---|
| `servytech_services` | Catálogo completo (seed desde `services.json` en la primera visita) |
| `servytech_favorites` | Array de IDs de servicios marcados como favoritos |

Para restablecer los datos iniciales, elimina las claves en DevTools → Application → Local Storage.

---

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Build de producción
npm run build

# 4. Vista previa del build local
npm run preview
```

---

## Despliegue en GitHub Pages

1. Abre `package.json` y reemplaza `<tu-usuario>` en la línea `homepage` con tu nombre de usuario de GitHub.
2. Verifica que el campo `base` en `vite.config.js` coincida con el nombre exacto de tu repositorio.
3. Ejecuta:
   ```bash
   npm run deploy
   ```
4. En GitHub → Settings → Pages → selecciona la branch `gh-pages` como source.
5. La app estará disponible en la URL definida en `homepage`.

---

## Autores

- Juan Alonso Torres — Desarrollador Frontend
- Santiago Aranda Hurtado — Diseñador UX/UI
- David Esteban Urquijo Hernández — Desarrollador Full Stack
- Santiago Ramírez Escobar — Desarrollador Frontend

Politécnico Grancolombiano — Módulo Desarrollo de Front-End — 2026
