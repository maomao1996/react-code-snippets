import { useState, useEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

export type Position = {
  x: number
  y: number
}

const useWindowScroll = (callback?: (position: Position) => void) => {
  const [position, setPosition] = useState<Position>(() => ({
    x: isBrowser ? window.pageXOffset : 0,
    y: isBrowser ? window.pageYOffset : 0
  }))

  useEffect(() => {
    const handler = () => {
      const newPosition = {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
      setPosition(newPosition)
      callback?.(newPosition)
    }

    window.addEventListener('scroll', handler, { capture: false, passive: true })

    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  return position
}

export default useWindowScroll
