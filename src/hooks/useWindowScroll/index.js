import { useState, useEffect } from 'react'
import { isFunction } from '../../utils'

//  窗体滚动 hook

const useWindowScroll = (callback) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = () => {
      const newPosition = {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
      setPosition(newPosition)
      return newPosition
    }
    const handler = () => {
      const newPosition = updatePosition()
      isFunction(callback) && callback(newPosition)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])
  return position
}

export default useWindowScroll
