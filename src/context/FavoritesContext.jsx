/**
 * FavoritesContext — Fuente única de verdad para la lista de favoritos del usuario.
 *
 * Persiste los IDs de servicios favoritos en localStorage bajo la clave
 * 'servytech_favorites'. El estado se comparte entre todas las páginas para
 * que agregar/quitar un favorito se refleje en tiempo real.
 *
 * API expuesta: { favoriteIds, addFavorite, removeFavorite, isFavorite }
 */

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'servytech_favorites'

const FavoritesContext = createContext(null)

/**
 * Proveedor que envuelve la app y comparte el estado de favoritos entre todas las páginas.
 * @param {{ children: React.ReactNode }} props
 */
export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  /**
   * Agrega un servicio a favoritos si no está ya incluido.
   * @param {string} id
   */
  function addFavorite(id) {
    setFavoriteIds(prev => prev.includes(id) ? prev : [...prev, id])
  }

  /**
   * Elimina un servicio de favoritos.
   * @param {string} id
   */
  function removeFavorite(id) {
    setFavoriteIds(prev => prev.filter(fid => fid !== id))
  }

  /**
   * Indica si un servicio está en favoritos.
   * @param {string} id
   * @returns {boolean}
   */
  function isFavorite(id) {
    return favoriteIds.includes(id)
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

/**
 * Hook para consumir el contexto de favoritos.
 * Debe usarse dentro de FavoritesProvider.
 * @returns {{ favoriteIds: string[], addFavorite: Function, removeFavorite: Function, isFavorite: Function }}
 */
export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavoritesContext debe usarse dentro de FavoritesProvider')
  return ctx
}
