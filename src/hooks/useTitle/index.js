import { useEffect } from 'react'

// 修改 title

const useTitle = title => {
  useEffect(() => {
    const oldTitle = document.title
    document.title = title
    return () => {
      document.title = oldTitle
    }
  }, [])
}

export default useTitle
