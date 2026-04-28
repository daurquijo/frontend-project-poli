/**
 * Contact — Página de contacto con formulario validado.
 *
 * Valida nombre (mín. 2 caracteres), correo electrónico (regex), asunto
 * y mensaje (mín. 10 caracteres). Muestra errores por campo y un banner
 * de confirmación al enviar. No requiere backend — solo UI.
 * Ruta: /contactanos
 */

import { useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields) {
  const errors = {}
  if (!fields.name || fields.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.'
  }
  if (!fields.email || !EMAIL_REGEX.test(fields.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }
  if (!fields.subject || fields.subject.trim().length === 0) {
    errors.subject = 'El asunto es obligatorio.'
  }
  if (!fields.message || fields.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  }
  return errors
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate(fields)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitted(true)
    setFields({ name: '', email: '', subject: '', message: '' })
    setErrors({})
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contáctanos</h1>
        <p className="text-gray-500 mb-8">Estamos aquí para ayudarte. Envíanos tu mensaje.</p>

        {submitted && (
          <div className="bg-green-50 border border-green-300 text-green-800 rounded-xl p-4 mb-6 text-sm">
            ✅ Gracias por contactarnos, te responderemos pronto.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
            <input
              type="text"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              placeholder="¿En qué podemos ayudarte?"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.subject ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none ${
                errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Enviar mensaje
          </button>
        </form>

        <div className="mt-12 border-t border-gray-100 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-800 mb-1">📧 Correo</p>
            <p>contacto@servytech.co</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">📞 Teléfono</p>
            <p>+57 300 000 0000</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">📍 Dirección</p>
            <p>Bogotá D.C., Colombia</p>
          </div>
        </div>
      </div>
    </div>
  )
}
