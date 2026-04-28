/**
 * Favorites — Lista de servicios guardados como favoritos por el usuario.
 *
 * Obtiene los IDs favoritos desde el contexto global y los cruza con el
 * catálogo de servicios para renderizar las tarjetas. Permite quitar un
 * favorito directamente desde esta vista.
 * Ruta: /favoritos
 */

import { Link } from 'react-router-dom'
import { useServicesContext } from '../context/ServicesContext'
import { useFavoritesContext } from '../context/FavoritesContext'
import ServiceCard from '../components/ServiceCard'

export default function Favorites() {
  const { services } = useServicesContext()
  const { favoriteIds, removeFavorite } = useFavoritesContext()

  const favorites = services.filter(s => favoriteIds.includes(s.id))

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Servicios favoritos
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-gray-400">
          <p className="text-lg">Aún no tienes ningún favorito</p>
          <Link
            to="/servicios"
            className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Selecciona uno ↗
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
