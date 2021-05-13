import { useEffect, useCallback, useRef } from 'react'

/**
 * 稳定的 Callback
 * https://overreacted.io/zh-hans/making-setinterval-declarative-with-react-hooks/
 **/
function useStableCallback<T extends (...args: any[]) => any>(callback: T) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  return useCallback((...args: any[]) => callbackRef.current(...args), []) as T
}

export default useStableCallback
