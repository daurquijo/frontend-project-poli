/**
 * ServiceCard — Tarjeta de presentación de un servicio en el catálogo.
 *
 * Muestra imagen, categoría, nombre, descripción breve y botón "Ver más".
 * Muestra un indicador de corazón (❤️) si el servicio está en favoritos.
 * Si se pasa la prop `onRemove`, se renderiza además un botón "Quitar"
 * (usado en la página de Favoritos).
 *
 * @param {{ service: import('../context/ServicesContext').Service, onRemove?: (id: string) => void }} props
 */

import { Link } from 'react-router-dom'
import { useFavoritesContext } from '../context/FavoritesContext'

export default function ServiceCard({ service, onRemove }) {
  const { isFavorite } = useFavoritesContext()
  const favorite = isFavorite(service.id)

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Imagen con indicador de favorito */}
      <div className="aspect-video overflow-hidden bg-gray-100 relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format' }}
        />
        {favorite && (
          <span
            className="absolute top-2 right-2 text-lg leading-none"
            title="En favoritos"
          >
            ❤️
          </span>
        )}
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
