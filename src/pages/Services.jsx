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
