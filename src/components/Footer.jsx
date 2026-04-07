export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Descubre</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚶</span>
            <span>© Area. 2026</span>
          </div>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}
