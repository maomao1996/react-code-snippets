import { useEffect, RefObject } from 'react'

import useStableCallback from '../useStableCallback'

function useClickOutside(
  target: RefObject<HTMLElement>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  const callback = useStableCallback(handler)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!target.current || target.current.contains(event.target as Element)) {
        return
      }
      callback(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [target, callback])
}

export default useClickOutside
