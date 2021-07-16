# useClickOutside 监听元素外点击

用来监听元素外部点击的 `Hook`

## 示例

```jsx
import React, { useState, useRef } from 'react'
import { Button, Card } from 'antd'

import useClickOutside from './index'

export default () => {
  const [state, setState] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, (event) => {
    setState(false)
    console.log('event', event)
  })

  return (
    <>
      <Button type="primary" onClick={() => setState(true)}>
        打开弹窗
      </Button>
      {state && (
        <div
          ref={ref}
          style={{
            position: 'fixed',
            top: '30vh',
            left: '40vw',
            zIndex: 10
          }}
        >
          <Card title="这是一个弹窗">
            <div style={{ width: '20vw' }}>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
            </div>
          </Card>
        </div>
        // <div
        //   ref={ref}
        //   style={{
        //     position: 'fixed',
        //     top: '30vh',
        //     left: '30vw',
        //     zIndex: 10,
        //     width: '40vw',
        //     height: '30vw',
        //     background: '#abcdef'
        //   }}
        // >
        //   我是一个弹窗（点击弹窗外会关闭）
        // </div>
      )}
    </>
  )
}
```
