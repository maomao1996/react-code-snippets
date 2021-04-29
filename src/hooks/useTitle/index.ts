import { useEffect } from 'react'

/** 修改 title hook */
const useTitle = (title: string): void => {
  useEffect(() => {
    // 保存之前的 title
    const oldTitle = document.title
    document.title = title
    return () => {
      // 组件卸载时还原之前的 title
      document.title = oldTitle
    }
  }, [title])
}

export default useTitle
