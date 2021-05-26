# useWindowScroll 监听窗体滚动

用于监听窗体滚动的 `Hook`

## 示例

```jsx
/**
 * title: 窗体滚动 demo
 */
import React from 'react'

import useWindowScroll from './index'

export default () => {
  const { x, y } = useWindowScroll(({ x, y }) => {
    console.log('window', x, y)
  })

  return (
    <>
      <div style={{ width: '1000px', height: '1000px' }}>查看右下角</div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 10,
          padding: '1rem',
          border: '1px solid #eee',
          width: 200,
          background: '#fff'
        }}
      >
        <div>当前窗口的 x : {x}</div>
        <div>当前窗口的 y : {y}</div>
      </div>
    </>
  )
}
```
