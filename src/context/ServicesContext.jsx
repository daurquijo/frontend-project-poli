/**
 * ServicesContext — Fuente única de verdad para el catálogo de servicios.
 *
 * Persiste en localStorage bajo la clave 'servytech_services'.
 * Si no hay datos guardados, se inicializa con los servicios del JSON local.
 *
 * API expuesta: { services, addService, deleteService }
 *
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} name
 * @property {string} shortDescription
 * @property {string} description
 * @property {string} image
 * @property {string} category
 * @property {string} price
 * @property {string} duration
 * @property {string} targetAudience
 * @property {boolean} featured
 * @property {string} icon
 */

import { createContext, useContext, useState, useEffect } from 'react'
import initialServices from '../data/services.json'

const STORAGE_KEY = 'servytech_services'

const ServicesContext = createContext(null)

/**
 * Proveedor que envuelve la app y comparte el estado de servicios entre todas las páginas.
 * @param {{ children: React.ReactNode }} props
 */
export function ServicesProvider({ children }) {
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

  /**
   * Agrega un nuevo servicio al catálogo.
   * @param {Omit<Service, 'id'|'featured'|'icon'>} service
   */
  function addService(service) {
    const newService = {
      ...service,
      id: Date.now().toString(),
      featured: false,
      icon: '🔧',
    }
    setServices(prev => [...prev, newService])
  }

  /**
   * Elimina un servicio por su ID.
   * @param {string} id
   */
  function deleteService(id) {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return (
    <ServicesContext.Provider value={{ services, addService, deleteService }}>
      {children}
    </ServicesContext.Provider>
  )
}

/**
 * Hook para consumir el contexto de servicios.
 * Debe usarse dentro de ServicesProvider.
 * @returns {{ services: Service[], addService: Function, deleteService: Function }}
 */
export function useServicesContext() {
  const ctx = useContext(ServicesContext)
  if (!ctx) throw new Error('useServicesContext debe usarse dentro de ServicesProvider')
  return ctx
}
