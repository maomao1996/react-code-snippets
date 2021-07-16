# ClickOutside 监听元素外部点击

用来监听包裹元素外部点击的组件

## 示例

```jsx
import React, { useState } from 'react'
import { Button, Card } from 'antd'

import ClickOutside from './index'

export default () => {
  const [state, setState] = useState(false)

  const handleClickOutside = (event) => {
    setState(false)
    console.log('event', event)
  }

  return (
    <>
      <Button type="primary" onClick={() => setState(true)}>
        打开弹窗
      </Button>
      {state && (
        <ClickOutside onClickOutside={handleClickOutside}>
          <Card
            title="这是一个弹窗"
            style={{
              position: 'fixed',
              top: '30vh',
              left: '40vw',
              zIndex: 10
            }}
          >
            <div style={{ width: '20vw' }}>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
              <p>点击弹窗外会关闭</p>
            </div>
          </Card>
        </ClickOutside>
      )}
    </>
  )
}
```
