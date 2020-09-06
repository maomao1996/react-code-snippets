import { useState, useEffect, useRef } from 'react'

// 滚动

const isFunction = (f) => typeof f === 'function'

const useScroll = (callback) => {
  const [state, setState] = useState({ x: 0, y: 0 })
  const ref = useRef()

  useEffect(() => {
    // 获取绑定滚动 dom
    const element = ref.current ? ref.current : window
    const updateState = () => {
      let newState
      if (element === window) {
        newState = {
          x: window.pageXOffset,
          y: window.pageYOffset
        }
      } else {
        newState = {
          x: element.scrollLeft,
          y: element.scrollTop
        }
      }
      setState(newState)
      return newState
    }
    const scrollFn = () => {
      const newState = updateState()
      isFunction(callback) && callback(newState)
    }
    if (element) {
      element.addEventListener('scroll', scrollFn, { passive: true })
    }
    return () => {
      if (element) {
        element.removeEventListener('scroll', scrollFn)
      }
    }
  }, [ref.current])
  return [state, ref]
}

export default useScroll
