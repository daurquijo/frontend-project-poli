/**
 * Home — Página de inicio de ServyTech.
 *
 * Muestra la sección hero, los servicios destacados (pulled desde el catálogo real
 * filtrando featured === true) y testimonios de clientes.
 * Ruta: /
 */

import { Link } from 'react-router-dom'
import { useServicesContext } from '../context/ServicesContext'

const testimonials = [
  {
    name: 'Santiago Aranda',
    quote: 'Gracias a su equipo pude digitalizar mi negocio rápidamente. Ahora tengo más clientes y mejor organización.',
    bg: 'bg-amber-100',
  },
  {
    name: 'Juan Alonso',
    quote: 'El servicio fue excelente. Me ayudaron a automatizar tareas que antes me tomaban horas.',
    bg: 'bg-blue-100',
  },
  {
    name: 'David Esteban',
    quote: 'Muy profesionales. Entendieron exactamente lo que necesitaba y lo convirtieron en una solución funcional.',
    bg: 'bg-teal-100',
  },
]

export default function Home() {
  const { services } = useServicesContext()
  const featured = services.filter(s => s.featured).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex flex-col justify-center px-8 md:px-16 py-20"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              Explora soluciones<br />digitales sin límites.
            </h1>
            <Link
              to="/servicios"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              Ver servicios →
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
              alt="Tecnología"
              className="w-full max-w-lg rounded-xl object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Featured Services — datos reales del catálogo */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Nuestros</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Servicios destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(service => (
            <div key={service.id} className="flex flex-col gap-3">
              <span className="text-3xl">{service.icon}</span>
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.shortDescription}</p>
              <Link
                to={`/servicios/${service.id}`}
                className="text-sm text-green-600 hover:underline font-medium w-fit"
              >
                Ver detalle →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-100 max-w-6xl mx-auto" />

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-gray-900">Testimonios</h2>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-600 mt-2 italic">"{t.quote}"</p>
                </div>
                <div className={`h-20 rounded-lg ${t.bg}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
