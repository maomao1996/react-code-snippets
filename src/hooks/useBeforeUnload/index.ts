import { useEffect } from 'react'

const TYPE = 'beforeunload'

function useBeforeUnload(enabled: boolean = true, message?: string) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()

      if (message) {
        event.returnValue = message
      }

      /**
       * 参考 react-beforeunload 解决 chrome 下不生效的问题
       * https://github.com/jacobbuck/react-beforeunload/blob/master/src/useBeforeunload.js
       */
      if (event.defaultPrevented) {
        return (event.returnValue = '')
      }

      return message
    }
    window.addEventListener(TYPE, handler)
    return () => {
      window.removeEventListener(TYPE, handler)
    }
  }, [enabled])
}

export default useBeforeUnload
