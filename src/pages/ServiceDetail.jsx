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
