import { useState, useEffect, useRef } from 'react'
import { isFunction } from '../../utils'

// 局部滚动 hook

const useScroll = (callback) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current === null) {
      return
    }
    // 获取绑定滚动 dom
    const element = ref.current
    const updatePosition = () => {
      const newPosition = {
        x: element.scrollLeft,
        y: element.scrollTop
      }
      setPosition(newPosition)
      return newPosition
    }
    const handler = () => {
      const newPosition = updatePosition()
      isFunction(callback) && callback(newPosition)
    }
    element.addEventListener('scroll', handler, { passive: true })
    return () => {
      element.removeEventListener('scroll', handler)
    }
  }, [ref.current])
  return [ref, position]
}

export default useScroll
