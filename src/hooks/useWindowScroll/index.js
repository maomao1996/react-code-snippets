import { useState, useEffect } from 'react'
import { isFunction } from '../../utils'

// 滚动

const useWindowScroll = (callback) => {
  const [state, setState] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateState = () => {
      const newState = {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
      setState(newState)
      return newState
    }
    const scrollFn = () => {
      const newState = updateState()
      isFunction(callback) && callback(newState)
    }
    window.addEventListener('scroll', scrollFn, { passive: true })
    return () => {
      window.removeEventListener('scroll', scrollFn)
    }
  }, [])
  return state
}

export default useWindowScroll
