import { useState, useEffect } from 'react'

const STORAGE_KEY = 'servytech_favorites'

export function useFavorites() {
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

  function addFavorite(id) {
    setFavoriteIds(prev => prev.includes(id) ? prev : [...prev, id])
  }

  function removeFavorite(id) {
    setFavoriteIds(prev => prev.filter(fid => fid !== id))
  }

  function isFavorite(id) {
    return favoriteIds.includes(id)
  }

  return { favoriteIds, addFavorite, removeFavorite, isFavorite }
}
