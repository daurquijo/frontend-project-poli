/**
 * App — Componente raíz de ServyTech.
 *
 * Configura los proveedores de estado global (ServicesProvider, FavoritesProvider)
 * y el enrutador (HashRouter) con todas las rutas de la aplicación.
 * HashRouter se usa para compatibilidad con GitHub Pages (sin servidor de reescritura).
 */

import { HashRouter, Routes, Route } from 'react-router-dom'
import { ServicesProvider } from './context/ServicesContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import About from './pages/About'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

/**
 * Layout — Wrapper con Header y Footer para todas las páginas.
 * @param {{ children: React.ReactNode }} props
 */
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

export default function App() {
  return (
    <HashRouter>
      <ServicesProvider>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/servicios" element={<Layout><Services /></Layout>} />
            <Route path="/servicios/:id" element={<Layout><ServiceDetail /></Layout>} />
            <Route path="/favoritos" element={<Layout><Favorites /></Layout>} />
            <Route path="/contactanos" element={<Layout><Contact /></Layout>} />
            <Route path="/acerca-de" element={<Layout><About /></Layout>} />
            <Route path="/admin" element={<Layout><Admin /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </FavoritesProvider>
      </ServicesProvider>
    </HashRouter>
  )
}
