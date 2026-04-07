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
