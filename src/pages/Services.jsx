/**
 * Services — Catálogo completo de servicios disponibles.
 *
 * Permite al usuario filtrar servicios por nombre (SearchBar) y por categoría
 * (selector dinámico generado desde las categorías existentes en el catálogo).
 * Los filtros se combinan con AND.
 * Ruta: /servicios
 */

import { useState } from 'react'
import { useServicesContext } from '../context/ServicesContext'
import ServiceCard from '../components/ServiceCard'
import SearchBar from '../components/SearchBar'

export default function Services() {
  const { services } = useServicesContext()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  // Categorías únicas derivadas del catálogo actual
  const categories = ['Todas', ...new Set(services.map(s => s.category))]

  const filtered = services.filter(s => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas' || s.category === selectedCategory
    return matchesQuery && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Nuestros Servicios</h1>
        <p className="text-gray-500 mb-6">Explora todos los servicios que ofrecemos</p>
        <button className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          Saber Más
        </button>
      </div>

      {/* Filtros: búsqueda + categoría */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
        <SearchBar value={query} onChange={setQuery} />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">
            No se encontraron servicios
            {query && ` para "${query}"`}
            {selectedCategory !== 'Todas' && ` en la categoría "${selectedCategory}"`}
          </p>
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
