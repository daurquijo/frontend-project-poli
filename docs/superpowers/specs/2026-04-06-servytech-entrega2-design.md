# ServyTech – Entrega 2: Prototipo Funcional

**Fecha:** 2026-04-06  
**Módulo:** Desarrollo de Front-End (Politécnico Grancolombiano)  
**Entrega:** Previa 2 – Semana 5  

---

## Contexto

La Entrega 1 estableció los mockups en Figma para la plataforma "ServyTech", un catálogo de
servicios digitales tecnológicos y educativos. La Entrega 2 convierte esos mockups en un
prototipo funcional real. El tutor revisará que la maquetación coincida con lo desarrollado, por
lo que el código debe replicar fielmente los diseños de Figma.

---

## Stack Tecnológico

| Herramienta | Uso |
|---|---|
| React 18 (Vite) | Framework principal, renderizado por componentes |
| Tailwind CSS v3 | Estilizado utilitario, responsividad |
| React Router v6 | Navegación SPA entre páginas |
| localStorage | Persistencia de favoritos y servicios CRUD |
| JSON local | Datos iniciales del catálogo (sin backend) |

---

## Estructura de Carpetas

```
frontend-project-poli/
  src/
    components/
      Header.jsx          ← Logo + nav + botón Ingresar
      Footer.jsx          ← Links + copyright
      ServiceCard.jsx     ← Card reutilizable para listados
      SearchBar.jsx       ← Input de búsqueda en tiempo real
    pages/
      Home.jsx            ← Hero + servicios destacados + testimonios
      Services.jsx        ← Grid completo + búsqueda
      ServiceDetail.jsx   ← Vista individual con favorito/contacto
      Favorites.jsx       ← Servicios guardados + estado vacío
      Contact.jsx         ← Formulario con validaciones
      About.jsx           ← Info del equipo y proyecto
      Admin.jsx           ← Mini CRUD con sidebar
    data/
      services.json       ← 10-12 servicios iniciales
    hooks/
      useFavorites.js     ← Lógica add/remove con localStorage
      useServices.js      ← Estado global de servicios (con CRUD)
    App.jsx               ← Router + rutas
    main.jsx              ← Entry point
    index.css             ← Tailwind directives
  public/
    (assets estáticos si los hay)
  index.html
  package.json
  vite.config.js
  tailwind.config.js
```

---

## Páginas y Componentes

### 1. Header (componente compartido)

- **Logo**: texto "ServyTech" a la izquierda
- **Nav**: enlaces "Principal", "servicios", "contactanos", "Favoritos" al centro
- **Botón**: "Ingresar" (color verde, sin funcionalidad real de auth)
- **Responsive**: menú hamburguesa en mobile que colapsa/expande
- El header se fija en todas las páginas

### 2. Footer (componente compartido)

- Links: "Descubre", "WhatsApp", "Facebook"
- Ícono de persona caminando (SVG/emoji)
- Copyright: "© Area. 2026 — Todos los derechos reservados"

### 3. Home (`/`)

Secciones en orden:
1. **Hero**: fondo oscuro con imagen de laptop/tecnología, título grande "Explora soluciones digitales sin límites.", sin subtítulo adicional
2. **Servicios destacados**: título "Servicios destacados" con ícono, 3 cards (Desarrollo Web, Automatización y Sistemas, Análisis y Soluciones Tecnológicas) con ícono + nombre + descripción breve
3. **Testimonios**: título "Testimonios" a la izquierda, 3 tarjetas (Santiago Aranda, Juan Alonso, David Esteban) con cita y foto de fondo de color
4. **Footer**

### 4. Servicios (`/servicios`)

- Título "Nuestros Servicios" centrado
- Subtítulo "Explora todos los servicios que ofrecemos"
- Botón "Saber Más"
- Grid de `ServiceCard` renderizadas desde `services.json`
- `SearchBar` para filtrar por nombre en tiempo real

### 5. Detalle del Servicio (`/servicios/:id`)

- Imagen grande del servicio
- Título completo
- Descripción extensa
- Datos: categoría, precio, duración, público objetivo
- Botón "Agregar a favoritos" (toggle, cambia aspecto si ya está guardado)
- Botón "Contactar" que navega a `/contacto`

### 6. Favoritos (`/favoritos`)

- Título "Servicios favoritos"
- Si hay favoritos: grid de `ServiceCard` con botón para eliminar
- Estado vacío: texto "Aun no Tienes ningun favorito" + botón "selecciona uno" → navega a `/servicios`

### 7. Contacto (`/contactanos`)

- Formulario con campos: Nombre, Correo electrónico, Asunto, Mensaje
- **Validaciones**:
  - Nombre: obligatorio, mínimo 2 caracteres
  - Correo: obligatorio, formato `regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Asunto: obligatorio
  - Mensaje: obligatorio, mínimo 10 caracteres
- Mensajes de error debajo de cada campo inválido
- Al enviar válido: mensaje de confirmación "Gracias por contactarnos, te responderemos pronto" + limpiar campos
- Debajo del formulario: datos de contacto adicionales

### 8. Acerca de (`/acerca-de`)

- Información del equipo (4 integrantes del PDF)
- Descripción del proyecto
- Tecnologías utilizadas

### 9. Admin – Mini CRUD (`/admin`)

- **Layout**: sidebar izquierdo + área principal
- **Sidebar**: "Que quieres hacer", "Servicios" (activo), "Clientes" (visual, sin funcionalidad), "Pendiente" (visual, sin funcionalidad)
- **Vista Servicios** (sección activa): formulario para crear nuevo servicio (nombre, descripción, imagen URL, categoría) + lista de servicios existentes con botón eliminar
- Al crear: aparece en el catálogo general; al eliminar: desaparece de ambos lugares
- Datos sincronizados con localStorage

---

## Datos: services.json

Esquema de cada servicio:

```json
{
  "id": "string",
  "name": "string",
  "shortDescription": "string (max 100 chars)",
  "description": "string (párrafo completo)",
  "image": "string (URL Unsplash)",
  "category": "string",
  "price": "string",
  "duration": "string",
  "targetAudience": "string",
  "featured": boolean
}
```

**10 servicios iniciales:**
1. Desarrollo Web – featured
2. Automatización y Sistemas – featured
3. Análisis y Soluciones Tecnológicas – featured
4. Consultoría IT
5. Curso: Programación desde Cero
6. Ciberseguridad Empresarial
7. Diseño UX/UI
8. Cloud Computing y DevOps
9. Marketing Digital
10. Soporte Técnico Remoto

---

## Estado y Lógica

### useFavorites.js

```
state: favoriteIds[] (localStorage key: "servytech_favorites")
addFavorite(id) → agrega id al array, persiste
removeFavorite(id) → elimina id del array, persiste
isFavorite(id) → boolean
```

### useServices.js

```
state: services[] (inicia desde services.json, persiste en localStorage key: "servytech_services")
addService(service) → agrega al array, persiste
deleteService(id) → filtra del array, persiste
```

---

## Navegación (React Router)

| Ruta | Página |
|---|---|
| `/` | Home |
| `/servicios` | Services |
| `/servicios/:id` | ServiceDetail |
| `/favoritos` | Favorites |
| `/contactanos` | Contact |
| `/acerca-de` | About |
| `/admin` | Admin |

---

## Fidelidad Visual con Mockups

El código debe replicar fielmente los mockups de Figma entregados en la Entrega 1:

- **Paleta**: fondo blanco, texto oscuro, acento verde para botones CTA
- **Header**: exactamente como mockup — logo izquierda, nav centrado, "Ingresar" verde a la derecha
- **Hero**: texto grande sobre fondo oscuro con imagen de tecnología
- **Cards de servicios destacados**: ícono + nombre + descripción sin imagen, layout en 3 columnas
- **Testimonios**: layout con título a la izquierda, tarjetas de cita a la derecha
- **Footer**: fondo oscuro con links y copyright

---

## Verificación

1. `npm run dev` → aplicación corre en localhost sin errores
2. Navegar a cada ruta y verificar que el layout coincide con los mockups del PDF
3. Agregar servicio a favoritos → aparece en `/favoritos`, persiste al recargar
4. Eliminar favorito → desaparece
5. Buscar servicio por nombre en `/servicios` → filtra en tiempo real
6. Enviar formulario vacío en `/contactanos` → errores de validación visibles
7. Enviar formulario válido → mensaje de confirmación + campos limpios
8. En `/admin`: crear nuevo servicio → aparece en `/servicios`
9. En `/admin`: eliminar servicio → desaparece de `/servicios`
10. Recargar página → favoritos y servicios creados persisten (localStorage)
