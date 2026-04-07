const team = [
  { name: 'Juan Alonso Torres', role: 'Desarrollador Frontend' },
  { name: 'Santiago Aranda Hurtado', role: 'Diseñador UX/UI' },
  { name: 'David Esteban Urquijo Hernández', role: 'Desarrollador Full Stack' },
  { name: 'Santiago Ramírez Escobar', role: 'Desarrollador Frontend' },
]

const techs = [
  { icon: '⚛️', name: 'React 18', desc: 'Framework principal' },
  { icon: '🎨', name: 'Tailwind CSS', desc: 'Estilizado utilitario' },
  { icon: '🔀', name: 'React Router v6', desc: 'Navegación SPA' },
  { icon: '💾', name: 'localStorage', desc: 'Persistencia de datos' },
  { icon: '⚡', name: 'Vite', desc: 'Bundler y dev server' },
]

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Acerca de ServyTech</h1>
        <p className="text-gray-500 leading-relaxed mb-12">
          ServyTech es una plataforma tipo catálogo de servicios digitales desarrollada como
          proyecto académico para el módulo de Desarrollo de Front-End en el Politécnico
          Grancolombiano. Permite a los usuarios explorar servicios tecnológicos y educativos,
          guardar favoritos y contactar al equipo.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestro equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member.name} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl mb-3">
                👤
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tecnologías utilizadas</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {techs.map(tech => (
            <div key={tech.name} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{tech.icon}</div>
              <p className="font-semibold text-gray-900 text-sm">{tech.name}</p>
              <p className="text-xs text-gray-400 mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
