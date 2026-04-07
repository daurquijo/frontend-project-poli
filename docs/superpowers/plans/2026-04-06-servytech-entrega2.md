# ServyTech Entrega 2 – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional React + Tailwind CSS SPA for ServyTech that replicates the Figma mockups from Entrega 1, with dynamic service catalog, favorites (localStorage), contact form with validation, and a mini CRUD admin panel.

**Architecture:** Single-page app using React Router v6 with shared Header/Footer layout. State lives in two custom hooks (useFavorites, useServices) that sync to localStorage. Services are seeded from a local JSON file and can be extended via the Admin page.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, React Router v6, localStorage, JSON local data

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Dependencies: react, react-dom, react-router-dom, vite, tailwindcss, postcss, autoprefixer |
| `vite.config.js` | Vite config |
| `tailwind.config.js` | Tailwind content paths |
| `postcss.config.js` | PostCSS with tailwind + autoprefixer |
| `index.html` | HTML entry point |
| `src/main.jsx` | React DOM render entry |
| `src/index.css` | Tailwind directives |
| `src/App.jsx` | BrowserRouter + Routes for all 7 pages |
| `src/data/services.json` | 10 initial services with full schema |
| `src/hooks/useFavorites.js` | favoriteIds state + localStorage sync |
| `src/hooks/useServices.js` | services state + localStorage sync + CRUD |
| `src/components/Header.jsx` | Logo, nav links, Ingresar button, hamburger |
| `src/components/Footer.jsx` | Social links, copyright |
| `src/components/ServiceCard.jsx` | Card: image, name, shortDesc, Ver más button |
| `src/components/SearchBar.jsx` | Controlled text input for filtering |
| `src/pages/Home.jsx` | Hero + featured services + testimonials |
| `src/pages/Services.jsx` | Full catalog grid + search |
| `src/pages/ServiceDetail.jsx` | Full service view + favorites toggle + contact nav |
| `src/pages/Favorites.jsx` | Saved services grid + empty state |
| `src/pages/Contact.jsx` | Form with validation + confirmation |
| `src/pages/About.jsx` | Team info + project description |
| `src/pages/Admin.jsx` | Sidebar layout + create/delete services |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/index.css`
- Create: `src/App.jsx` (skeleton)

- [ ] **Step 1: Initialize project with Vite + React**

```bash
cd /Users/davidurquijo/Documents/David/Poli/frontend-project-poli
npm create vite@latest . -- --template react
```

When prompted "Current directory is not empty. Remove existing files and continue?" — select **Yes** (this will clear files except .git). When prompted to select framework, choose **React**. When prompted variant, choose **JavaScript**.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind content paths**

Replace the entire content of `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#4CAF50',
          dark: '#1a1a2e',
        }
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Add Tailwind directives to src/index.css**

Replace the entire content of `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

- [ ] **Step 5: Replace src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 6: Replace index.html title**

Edit `index.html` and change the `<title>` tag to `<title>ServyTech</title>`.

- [ ] **Step 7: Create skeleton App.jsx**

Replace `src/App.jsx` with:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 8: Verify scaffold runs**

```bash
npm run dev
```

Expected: Terminal shows `Local: http://localhost:5173/`. Browser shows "Home" text. No errors in console.

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: scaffold React + Vite + Tailwind project"
```

---

## Task 2: Service Data (JSON)

**Files:**
- Create: `src/data/services.json`

- [ ] **Step 1: Create data directory and services.json**

```bash
mkdir -p src/data
```

Create `src/data/services.json` with this exact content:

```json
[
  {
    "id": "1",
    "name": "Desarrollo Web",
    "shortDescription": "Diseñamos y desarrollamos páginas web modernas, rápidas y seguras, adaptadas a cualquier tipo de negocio o proyecto personal.",
    "description": "Ofrecemos soluciones completas de desarrollo web desde cero o mejora de sitios existentes. Nuestro equipo domina tecnologías modernas como React, Angular y Vue, combinadas con backends robustos. Cada proyecto pasa por fases de diseño, desarrollo, pruebas y despliegue con estándares de calidad.",
    "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format",
    "category": "Tecnología",
    "price": "$1,200,000 COP",
    "duration": "4-8 semanas",
    "targetAudience": "Empresas y emprendedores",
    "featured": true,
    "icon": "🌐"
  },
  {
    "id": "2",
    "name": "Automatización y Sistemas",
    "shortDescription": "Optimizamos tus procesos mediante herramientas tecnológicas que reducen el trabajo manual y aumentan la eficiencia.",
    "description": "Implementamos soluciones de automatización empresarial usando RPA, scripts personalizados e integraciones entre sistemas. Reducimos tareas repetitivas, minimizamos errores humanos y liberamos tiempo para actividades de mayor valor en tu organización.",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format",
    "category": "Tecnología",
    "price": "$800,000 COP",
    "duration": "2-4 semanas",
    "targetAudience": "Empresas con procesos repetitivos",
    "featured": true,
    "icon": "⚙️"
  },
  {
    "id": "3",
    "name": "Análisis y Soluciones Tecnológicas",
    "shortDescription": "Implementamos soluciones inteligentes que te ayudan a tomar mejores decisiones basadas en datos.",
    "description": "Transformamos tus datos en insights accionables mediante dashboards interactivos, reportes automáticos y análisis predictivo. Utilizamos herramientas como Power BI, Python y SQL para construir soluciones de analítica que impulsan decisiones estratégicas.",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format",
    "category": "Datos",
    "price": "$950,000 COP",
    "duration": "3-6 semanas",
    "targetAudience": "Gerentes y tomadores de decisión",
    "featured": true,
    "icon": "📊"
  },
  {
    "id": "4",
    "name": "Consultoría IT",
    "shortDescription": "Asesoramiento estratégico para que tu empresa adopte tecnología de forma eficiente y segura.",
    "description": "Nuestros consultores analizan tu infraestructura tecnológica actual, identifican cuellos de botella y proponen soluciones alineadas con tus objetivos de negocio. Acompañamos desde la planificación hasta la implementación y seguimiento.",
    "image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format",
    "category": "Consultoría",
    "price": "$600,000 COP",
    "duration": "1-2 semanas",
    "targetAudience": "PyMEs y startups",
    "featured": false,
    "icon": "💼"
  },
  {
    "id": "5",
    "name": "Curso: Programación desde Cero",
    "shortDescription": "Aprende a programar desde el principio con metodología práctica y proyectos reales.",
    "description": "Curso intensivo diseñado para personas sin experiencia previa en programación. Cubre fundamentos de lógica de programación, HTML, CSS, JavaScript y una introducción a frameworks modernos. Clases en vivo, grabaciones disponibles y proyectos prácticos.",
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format",
    "category": "Educación",
    "price": "$350,000 COP",
    "duration": "8 semanas",
    "targetAudience": "Principiantes y profesionales en transición",
    "featured": false,
    "icon": "💻"
  },
  {
    "id": "6",
    "name": "Ciberseguridad Empresarial",
    "shortDescription": "Protegemos tu empresa contra amenazas digitales con auditorías y soluciones de seguridad.",
    "description": "Realizamos auditorías de seguridad completas, identificamos vulnerabilidades en tu infraestructura y aplicaciones, e implementamos medidas preventivas. Incluye capacitación al personal, configuración de firewalls y monitoreo continuo.",
    "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format",
    "category": "Seguridad",
    "price": "$1,500,000 COP",
    "duration": "3-5 semanas",
    "targetAudience": "Empresas con datos sensibles",
    "featured": false,
    "icon": "🔒"
  },
  {
    "id": "7",
    "name": "Diseño UX/UI",
    "shortDescription": "Creamos interfaces intuitivas y atractivas centradas en la experiencia del usuario.",
    "description": "Diseñamos experiencias digitales que conectan con los usuarios. Nuestro proceso incluye investigación de usuarios, wireframes, prototipos interactivos en Figma y pruebas de usabilidad. Entregamos diseños listos para implementación con guías de estilo completas.",
    "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format",
    "category": "Diseño",
    "price": "$750,000 COP",
    "duration": "2-4 semanas",
    "targetAudience": "Startups y equipos de producto",
    "featured": false,
    "icon": "🎨"
  },
  {
    "id": "8",
    "name": "Cloud Computing y DevOps",
    "shortDescription": "Migramos y optimizamos tu infraestructura en la nube con prácticas DevOps modernas.",
    "description": "Implementamos arquitecturas cloud en AWS, Azure o Google Cloud. Configuramos pipelines de CI/CD, contenedores Docker, orquestación con Kubernetes y monitoreo. Reducimos costos operativos y aumentamos la disponibilidad de tus aplicaciones.",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format",
    "category": "Infraestructura",
    "price": "$1,800,000 COP",
    "duration": "4-10 semanas",
    "targetAudience": "Empresas en crecimiento tecnológico",
    "featured": false,
    "icon": "☁️"
  },
  {
    "id": "9",
    "name": "Marketing Digital",
    "shortDescription": "Estrategias digitales que aumentan tu visibilidad y convierten visitas en clientes.",
    "description": "Desarrollamos estrategias integrales de marketing digital: SEO, SEM, redes sociales, email marketing y analítica web. Creamos contenido de valor, gestionamos campañas publicitarias y medimos resultados con KPIs claros para maximizar tu ROI.",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format",
    "category": "Marketing",
    "price": "$500,000 COP/mes",
    "duration": "Servicio mensual",
    "targetAudience": "Negocios que buscan crecer online",
    "featured": false,
    "icon": "📱"
  },
  {
    "id": "10",
    "name": "Soporte Técnico Remoto",
    "shortDescription": "Asistencia técnica inmediata para resolver problemas de hardware y software a distancia.",
    "description": "Brindamos soporte técnico remoto para empresas y particulares. Resolvemos problemas de software, configuración de redes, instalación de programas, virus y mantenimiento preventivo. Tiempo de respuesta garantizado de 2 horas en días hábiles.",
    "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format",
    "category": "Soporte",
    "price": "$120,000 COP/hora",
    "duration": "Según necesidad",
    "targetAudience": "Empresas y usuarios finales",
    "featured": false,
    "icon": "🛠️"
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/services.json
git commit -m "feat: add services JSON data with 10 tech/education services"
```

---

## Task 3: Custom Hooks

**Files:**
- Create: `src/hooks/useFavorites.js`
- Create: `src/hooks/useServices.js`

- [ ] **Step 1: Create hooks directory**

```bash
mkdir -p src/hooks
```

- [ ] **Step 2: Create useFavorites.js**

Create `src/hooks/useFavorites.js`:

```js
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'servytech_favorites'

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  function addFavorite(id) {
    setFavoriteIds(prev => prev.includes(id) ? prev : [...prev, id])
  }

  function removeFavorite(id) {
    setFavoriteIds(prev => prev.filter(fid => fid !== id))
  }

  function isFavorite(id) {
    return favoriteIds.includes(id)
  }

  return { favoriteIds, addFavorite, removeFavorite, isFavorite }
}
```

- [ ] **Step 3: Create useServices.js**

Create `src/hooks/useServices.js`:

```js
import { useState, useEffect } from 'react'
import initialServices from '../data/services.json'

const STORAGE_KEY = 'servytech_services'

export function useServices() {
  const [services, setServices] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : initialServices
    } catch {
      return initialServices
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services))
  }, [services])

  function addService(service) {
    const newService = {
      ...service,
      id: Date.now().toString(),
      featured: false,
      icon: '🔧',
    }
    setServices(prev => [...prev, newService])
  }

  function deleteService(id) {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return { services, addService, deleteService }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useFavorites and useServices hooks with localStorage sync"
```

---

## Task 4: Shared Components (Header + Footer)

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create components directory**

```bash
mkdir -p src/components
```

- [ ] **Step 2: Create Header.jsx**

Create `src/components/Header.jsx`:

```jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Principal' },
    { to: '/servicios', label: 'servicios' },
    { to: '/contactanos', label: 'contactanos' },
    { to: '/favoritos', label: 'Favoritos' },
  ]

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          ServyTech
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? 'text-green-600 font-medium underline underline-offset-4'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Ingresar button */}
        <div className="hidden md:flex items-center">
          <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
            Ingresar ↗
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm py-1 ${isActive ? 'text-green-600 font-medium' : 'text-gray-600'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button className="bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-full w-fit">
            Ingresar ↗
          </button>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Create Footer.jsx**

Create `src/components/Footer.jsx`:

```jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Descubre</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚶</span>
            <span>© Area. 2026</span>
          </div>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "feat: add Header and Footer shared components"
```

---

## Task 5: ServiceCard and SearchBar Components

**Files:**
- Create: `src/components/ServiceCard.jsx`
- Create: `src/components/SearchBar.jsx`

- [ ] **Step 1: Create ServiceCard.jsx**

Create `src/components/ServiceCard.jsx`:

```jsx
import { Link } from 'react-router-dom'

export default function ServiceCard({ service, onRemove }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format' }}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{service.icon || '🔧'}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{service.category}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{service.shortDescription}</p>
        <div className="mt-4 flex gap-2">
          <Link
            to={`/servicios/${service.id}`}
            className="flex-1 text-center text-sm bg-gray-900 hover:bg-gray-700 text-white py-2 px-3 rounded-lg transition-colors"
          >
            Ver más
          </Link>
          {onRemove && (
            <button
              onClick={() => onRemove(service.id)}
              className="text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 py-2 px-3 rounded-lg transition-colors"
            >
              Quitar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create SearchBar.jsx**

Create `src/components/SearchBar.jsx`:

```jsx
export default function SearchBar({ value, onChange, placeholder = 'Buscar servicios...' }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
      />
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ServiceCard.jsx src/components/SearchBar.jsx
git commit -m "feat: add ServiceCard and SearchBar reusable components"
```

---

## Task 6: App Router Setup

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace App.jsx with full router**

Replace the entire content of `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import About from './pages/About'
import Admin from './pages/Admin'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/servicios" element={<Layout><Services /></Layout>} />
        <Route path="/servicios/:id" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/favoritos" element={<Layout><Favorites /></Layout>} />
        <Route path="/contactanos" element={<Layout><Contact /></Layout>} />
        <Route path="/acerca-de" element={<Layout><About /></Layout>} />
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 2: Create placeholder pages so app compiles**

Create each of these files with minimal content. Run this sequence:

```bash
mkdir -p src/pages
```

Create `src/pages/Home.jsx`:
```jsx
export default function Home() { return <div className="p-8">Home</div> }
```

Create `src/pages/Services.jsx`:
```jsx
export default function Services() { return <div className="p-8">Services</div> }
```

Create `src/pages/ServiceDetail.jsx`:
```jsx
export default function ServiceDetail() { return <div className="p-8">Detail</div> }
```

Create `src/pages/Favorites.jsx`:
```jsx
export default function Favorites() { return <div className="p-8">Favorites</div> }
```

Create `src/pages/Contact.jsx`:
```jsx
export default function Contact() { return <div className="p-8">Contact</div> }
```

Create `src/pages/About.jsx`:
```jsx
export default function About() { return <div className="p-8">About</div> }
```

Create `src/pages/Admin.jsx`:
```jsx
export default function Admin() { return <div className="p-8">Admin</div> }
```

- [ ] **Step 3: Verify all routes work**

```bash
npm run dev
```

Visit `http://localhost:5173/`, `/servicios`, `/favoritos`, `/contactanos`, `/acerca-de`, `/admin`. Each should render the placeholder text with the Header and Footer visible.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/
git commit -m "feat: configure React Router with all 7 routes and shared Layout"
```

---

## Task 7: Home Page

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Implement Home.jsx**

Replace the entire content of `src/pages/Home.jsx`:

```jsx
import { Link } from 'react-router-dom'

const featuredServices = [
  {
    icon: '🌐',
    name: 'Desarrollo Web',
    description: 'Diseñamos y desarrollamos páginas web modernas, rápidas y seguras, adaptadas a cualquier tipo de negocio o proyecto personal.',
  },
  {
    icon: '⚙️',
    name: 'Automatización y Sistemas',
    description: 'Optimizamos tus procesos mediante herramientas tecnológicas que reducen el trabajo manual y aumentan la eficiencia.',
  },
  {
    icon: '📊',
    name: 'Análisis y Soluciones Tecnológicas',
    description: 'Implementamos soluciones inteligentes que te ayudan a tomar mejores decisiones basadas en datos.',
  },
]

const testimonials = [
  {
    name: 'Santiago Aranda',
    quote: 'Gracias a su equipo pude digitalizar mi negocio rápidamente. Ahora tengo más clientes y mejor organización.',
    bg: 'bg-amber-100',
  },
  {
    name: 'Juan Alonso',
    quote: 'El servicio fue excelente. Me ayudaron a automatizar tareas que antes me tomaban horas.',
    bg: 'bg-blue-100',
  },
  {
    name: 'David Esteban',
    quote: 'Muy profesionales. Entendieron exactamente lo que necesitaba y lo convirtieron en una solución funcional.',
    bg: 'bg-teal-100',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex flex-col justify-center px-8 md:px-16 py-20"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              Explora soluciones<br />digitales sin límites.
            </h1>
            <Link
              to="/servicios"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              Ver servicios →
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
              alt="Tecnología"
              className="w-full max-w-lg rounded-xl object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Nuestros</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Servicios destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map(service => (
            <div key={service.name} className="flex flex-col gap-3">
              <span className="text-3xl">{service.icon}</span>
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-100 max-w-6xl mx-auto" />

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-gray-900">Testimonios</h2>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-600 mt-2 italic">"{t.quote}"</p>
                </div>
                <div className={`h-20 rounded-lg ${t.bg}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify Home page**

```bash
npm run dev
```

Visit `http://localhost:5173/`. Confirm:
- Dark hero section with large white text "Explora soluciones digitales sin límites."
- Green "Ver servicios →" button
- 3 featured services with icons below
- Testimonials section with 3 cards

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: implement Home page with hero, featured services, and testimonials"
```

---

## Task 8: Services Page

**Files:**
- Modify: `src/pages/Services.jsx`

- [ ] **Step 1: Implement Services.jsx**

Replace the entire content of `src/pages/Services.jsx`:

```jsx
import { useState } from 'react'
import { useServices } from '../hooks/useServices'
import ServiceCard from '../components/ServiceCard'
import SearchBar from '../components/SearchBar'

export default function Services() {
  const { services } = useServices()
  const [query, setQuery] = useState('')

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Nuestros Servicios</h1>
        <p className="text-gray-500 mb-6">Explora todos los servicios que ofrecemos</p>
        <button className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          Saber Más
        </button>
      </div>

      <div className="mb-8">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No se encontraron servicios para "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify Services page**

Visit `http://localhost:5173/servicios`. Confirm:
- Title "Nuestros Servicios" and subtitle
- "Saber Más" button
- Search bar
- Grid of 10 service cards with images
- Typing in search bar filters cards in real time

- [ ] **Step 3: Commit**

```bash
git add src/pages/Services.jsx
git commit -m "feat: implement Services page with dynamic grid and real-time search"
```

---

## Task 9: Service Detail Page

**Files:**
- Modify: `src/pages/ServiceDetail.jsx`

- [ ] **Step 1: Implement ServiceDetail.jsx**

Replace the entire content of `src/pages/ServiceDetail.jsx`:

```jsx
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { services } = useServices()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const service = services.find(s => s.id === id)

  if (!service) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg mb-4">Servicio no encontrado.</p>
        <Link to="/servicios" className="text-green-600 hover:underline">
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(service.id)

  function handleFavoriteToggle() {
    if (favorite) {
      removeFavorite(service.id)
    } else {
      addFavorite(service.id)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1 transition-colors"
      >
        ← Volver
      </button>

      <div className="rounded-2xl overflow-hidden border border-gray-200 mb-8">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-72 object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format' }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{service.icon || '🔧'}</span>
            <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{service.category}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

          <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Precio</p>
              <p className="font-semibold text-gray-800">{service.price}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Duración</p>
              <p className="font-semibold text-gray-800">{service.duration}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Público objetivo</p>
              <p className="font-semibold text-gray-800">{service.targetAudience}</p>
            </div>
          </div>
        </div>

        <div className="md:w-64 flex flex-col gap-3">
          <button
            onClick={handleFavoriteToggle}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-colors text-sm ${
              favorite
                ? 'bg-yellow-50 border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-100'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {favorite ? '★ En favoritos' : '☆ Agregar a favoritos'}
          </button>
          <Link
            to="/contactanos"
            className="w-full py-3 px-4 rounded-xl font-medium text-sm text-center bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify Service Detail page**

Visit `http://localhost:5173/servicios`, click "Ver más" on any card. Confirm:
- Service image, name, description, category, price, duration, targetAudience displayed
- "Agregar a favoritos" button toggles between states when clicked
- "Contactar" button navigates to `/contactanos`
- Back button works

- [ ] **Step 3: Commit**

```bash
git add src/pages/ServiceDetail.jsx
git commit -m "feat: implement ServiceDetail page with favorites toggle"
```

---

## Task 10: Favorites Page

**Files:**
- Modify: `src/pages/Favorites.jsx`

- [ ] **Step 1: Implement Favorites.jsx**

Replace the entire content of `src/pages/Favorites.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import ServiceCard from '../components/ServiceCard'

export default function Favorites() {
  const { services } = useServices()
  const { favoriteIds, removeFavorite } = useFavorites()

  const favorites = services.filter(s => favoriteIds.includes(s.id))

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Servicios favoritos
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-gray-400">
          <p className="text-lg">Aun no Tienes ningun favorito</p>
          <Link
            to="/servicios"
            className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            selecciona uno ↗
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify Favorites page**

1. Visit `http://localhost:5173/favoritos` — should show empty state with "Aun no Tienes ningun favorito" and "selecciona uno ↗" button
2. Go to `/servicios`, click a service, click "Agregar a favoritos"
3. Go back to `/favoritos` — service card should appear with "Quitar" button
4. Click "Quitar" — card disappears
5. Reload page — favorites persist

- [ ] **Step 3: Commit**

```bash
git add src/pages/Favorites.jsx
git commit -m "feat: implement Favorites page with empty state and remove functionality"
```

---

## Task 11: Contact Page

**Files:**
- Modify: `src/pages/Contact.jsx`

- [ ] **Step 1: Implement Contact.jsx**

Replace the entire content of `src/pages/Contact.jsx`:

```jsx
import { useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields) {
  const errors = {}
  if (!fields.name || fields.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.'
  }
  if (!fields.email || !EMAIL_REGEX.test(fields.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }
  if (!fields.subject || fields.subject.trim().length === 0) {
    errors.subject = 'El asunto es obligatorio.'
  }
  if (!fields.message || fields.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  }
  return errors
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate(fields)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitted(true)
    setFields({ name: '', email: '', subject: '', message: '' })
    setErrors({})
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contáctanos</h1>
        <p className="text-gray-500 mb-8">Estamos aquí para ayudarte. Envíanos tu mensaje.</p>

        {submitted && (
          <div className="bg-green-50 border border-green-300 text-green-800 rounded-xl p-4 mb-6 text-sm">
            ✅ Gracias por contactarnos, te responderemos pronto.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
            <input
              type="text"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              placeholder="¿En qué podemos ayudarte?"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.subject ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none ${
                errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Enviar mensaje
          </button>
        </form>

        <div className="mt-12 border-t border-gray-100 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-800 mb-1">📧 Correo</p>
            <p>contacto@servytech.co</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">📞 Teléfono</p>
            <p>+57 300 000 0000</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">📍 Dirección</p>
            <p>Bogotá D.C., Colombia</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify Contact page**

Visit `http://localhost:5173/contactanos`. Confirm:
- Clicking "Enviar mensaje" with empty fields shows red error messages under each field
- Entering an invalid email (e.g. "notanemail") shows email error
- Filling all fields correctly and submitting shows green confirmation message
- Fields clear after successful submission

- [ ] **Step 3: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "feat: implement Contact page with form validation and confirmation"
```

---

## Task 12: About Page

**Files:**
- Modify: `src/pages/About.jsx`

- [ ] **Step 1: Implement About.jsx**

Replace the entire content of `src/pages/About.jsx`:

```jsx
const team = [
  { name: 'Juan Alonso Torres', role: 'Desarrollador Frontend' },
  { name: 'Santiago Aranda Hurtado', role: 'Diseñador UX/UI' },
  { name: 'David Esteban Urquijo Hernández', role: 'Desarrollador Full Stack' },
  { name: 'Santiago Ramírez Escobar', role: 'Desarrollador Frontend' },
]

const techs = [
  { icon: '⚛️', name: 'React 18', desc: 'Framework principal' },
  { icon: '🎨', name: 'Tailwind CSS', desc: 'Estilizado utilitario' },
  { icon: '🔀', name: 'React Router v6', desc: 'Navegación SPA' },
  { icon: '💾', name: 'localStorage', desc: 'Persistencia de datos' },
  { icon: '⚡', name: 'Vite', desc: 'Bundler y dev server' },
]

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Acerca de ServyTech</h1>
        <p className="text-gray-500 leading-relaxed mb-12">
          ServyTech es una plataforma tipo catálogo de servicios digitales desarrollada como
          proyecto académico para el módulo de Desarrollo de Front-End en el Politécnico
          Grancolombiano. Permite a los usuarios explorar servicios tecnológicos y educativos,
          guardar favoritos y contactar al equipo.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestro equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member.name} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl mb-3">
                👤
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tecnologías utilizadas</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {techs.map(tech => (
            <div key={tech.name} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{tech.icon}</div>
              <p className="font-semibold text-gray-900 text-sm">{tech.name}</p>
              <p className="text-xs text-gray-400 mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: implement About page with team and tech stack"
```

---

## Task 13: Admin Page (Mini CRUD)

**Files:**
- Modify: `src/pages/Admin.jsx`

- [ ] **Step 1: Implement Admin.jsx**

Replace the entire content of `src/pages/Admin.jsx`:

```jsx
import { useState } from 'react'
import { useServices } from '../hooks/useServices'

const CATEGORIES = ['Tecnología', 'Datos', 'Consultoría', 'Educación', 'Seguridad', 'Diseño', 'Infraestructura', 'Marketing', 'Soporte']

export default function Admin() {
  const { services, addService, deleteService } = useServices()
  const [activeSection, setActiveSection] = useState('Servicios')
  const [form, setForm] = useState({ name: '', shortDescription: '', description: '', image: '', category: 'Tecnología' })
  const [formError, setFormError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const sidebarItems = ['Servicios', 'Clientes', 'Pendiente']

  function handleFormChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleCreate(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.shortDescription.trim() || !form.description.trim()) {
      setFormError('Nombre, descripción breve y descripción completa son obligatorios.')
      return
    }
    addService({
      name: form.name.trim(),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      image: form.image.trim() || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format',
      category: form.category,
      price: 'A convenir',
      duration: 'A convenir',
      targetAudience: 'General',
    })
    setForm({ name: '', shortDescription: '', description: '', image: '', category: 'Tecnología' })
    setFormError('')
    setSuccessMsg('Servicio creado exitosamente.')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <aside className="w-48 border-r border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Que quieres hacer</p>
          <nav className="flex flex-col gap-1">
            {sidebarItems.map(item => (
              <button
                key={item}
                onClick={() => item === 'Servicios' && setActiveSection(item)}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item && item === 'Servicios'
                    ? 'bg-gray-900 text-white font-medium'
                    : item !== 'Servicios'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ServyTech</h1>
          <p className="text-gray-500 mb-8">Bienvenido de nuevo</p>

          {/* Create form */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Agregar nuevo servicio</h2>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
                {formError}
              </div>
            )}
            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-4">
                ✅ {successMsg}
              </div>
            )}

            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Nombre del servicio"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Categoría</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Descripción breve *</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleFormChange}
                  placeholder="Máximo 100 caracteres"
                  maxLength={100}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Descripción completa *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Descripción detallada del servicio"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">URL de imagen (opcional)</label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                  + Crear servicio
                </button>
              </div>
            </form>
          </section>

          {/* Services list */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Servicios existentes ({services.length})
            </h2>
            <div className="flex flex-col gap-2">
              {services.map(service => (
                <div
                  key={service.id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{service.icon || '🔧'}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-400">{service.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify Admin page**

Visit `http://localhost:5173/admin`. Confirm:
- Sidebar visible with "Servicios" active, "Clientes" and "Pendiente" grayed out
- "ServyTech / Bienvenido de nuevo" heading
- Form to create a service
- List of 10 existing services each with "Eliminar" button
- Fill form and click "+ Crear servicio" → new service appears in the list
- Go to `/servicios` → new service appears in catalog
- Click "Eliminar" → service disappears from list and from `/servicios`
- Submitting empty form shows error message

- [ ] **Step 3: Commit**

```bash
git add src/pages/Admin.jsx
git commit -m "feat: implement Admin page with sidebar layout and mini CRUD"
```

---

## Task 14: Add About to Navigation

**Files:**
- Modify: `src/components/Header.jsx`

- [ ] **Step 1: Add Acerca de link to nav**

In `src/components/Header.jsx`, update the `navLinks` array to include "Acerca de":

```jsx
const navLinks = [
  { to: '/', label: 'Principal' },
  { to: '/servicios', label: 'servicios' },
  { to: '/contactanos', label: 'contactanos' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/acerca-de', label: 'Acerca de' },
]
```

- [ ] **Step 2: Verify navigation**

Confirm all 5 nav links appear in the header and navigate correctly to their pages.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: add Acerca de link to navigation header"
```

---

## Task 15: Final Verification

- [ ] **Step 1: Run full dev server**

```bash
npm run dev
```

- [ ] **Step 2: Checklist — test each item manually**

| # | Test | Expected |
|---|---|---|
| 1 | Visit `/` | Hero, featured services (3), testimonials, footer all visible |
| 2 | Visit `/servicios` | Grid of 10 cards, search bar works |
| 3 | Search "web" on `/servicios` | Only "Desarrollo Web" card shows |
| 4 | Click "Ver más" on any card | Detail page with image, info, buttons |
| 5 | Click "Agregar a favoritos" | Button changes to "★ En favoritos" |
| 6 | Visit `/favoritos` | Card appears, "Quitar" removes it |
| 7 | Reload after adding favorite | Favorite still persists |
| 8 | Visit `/contactanos`, submit empty | 4 error messages shown |
| 9 | Fill contact form, submit | Green confirmation, fields cleared |
| 10 | Visit `/admin`, create service | Appears in service list and `/servicios` |
| 11 | Delete service from `/admin` | Disappears from list and `/servicios` |
| 12 | Reload after admin changes | Services still persisted |
| 13 | Resize browser to mobile | Hamburger menu appears, layout adapts |
| 14 | Visit `/acerca-de` | Team members and tech stack visible |

- [ ] **Step 3: Build for production**

```bash
npm run build
```

Expected: Build completes with no errors. Output in `dist/` folder.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete ServyTech Entrega 2 functional prototype"
```

---

## Summary

| Task | Output |
|---|---|
| 1 | Vite + React + Tailwind scaffold |
| 2 | 10 services in JSON data file |
| 3 | useFavorites + useServices hooks |
| 4 | Header + Footer components |
| 5 | ServiceCard + SearchBar components |
| 6 | React Router with 7 routes |
| 7 | Home page (hero + featured + testimonials) |
| 8 | Services page (grid + search) |
| 9 | ServiceDetail page (full view + favorites) |
| 10 | Favorites page (grid + empty state) |
| 11 | Contact page (form + validation) |
| 12 | About page (team + tech) |
| 13 | Admin page (sidebar + mini CRUD) |
| 14 | Navigation update |
| 15 | Final verification + production build |
