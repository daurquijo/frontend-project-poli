/**
 * Admin — Panel de administración del catálogo de servicios.
 *
 * Permite crear nuevos servicios (formulario con validaciones) y eliminar
 * servicios existentes (con confirmación previa). Los cambios se reflejan
 * en tiempo real en todas las páginas gracias al contexto compartido.
 * Ruta: /admin
 */

import { useState } from 'react'
import { useServicesContext } from '../context/ServicesContext'

const CATEGORIES = ['Tecnología', 'Datos', 'Consultoría', 'Educación', 'Seguridad', 'Diseño', 'Infraestructura', 'Marketing', 'Soporte']

export default function Admin() {
  const { services, addService, deleteService } = useServicesContext()
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

  function handleDelete(id, name) {
    if (window.confirm(`¿Eliminar el servicio "${name}"? Esta acción no se puede deshacer.`)) {
      deleteService(id)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <aside className="w-48 border-r border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Qué quieres hacer</p>
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
                    onClick={() => handleDelete(service.id, service.name)}
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
