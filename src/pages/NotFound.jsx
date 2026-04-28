/**
 * NotFound — Página 404.
 * Se muestra cuando el usuario navega a una ruta que no existe.
 * Ruta: /* (catch-all en App.jsx)
 */

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center gap-6">
      <span className="text-7xl">🔍</span>
      <h1 className="text-4xl font-bold text-gray-900">404 — Página no encontrada</h1>
      <p className="text-gray-500 max-w-md">
        La ruta que buscas no existe o fue movida. Regresa al inicio y explora nuestros servicios.
      </p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
