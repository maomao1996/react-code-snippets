# NumberFlip 数字翻转

大屏数字滚动

## 示例

### 默认样式

```jsx
import React, { useState, useEffect } from 'react'
import { Button, Space } from 'antd'

import NumberFlip from './index'

export default () => {
  const [count, setCount] = useState(99)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((v) => v + 1)
    }, 1e3)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      整数
      <NumberFlip count={count} />
      1 位小数
      <NumberFlip count={count} precision={1} />
      2 位小数
      <NumberFlip count={count} precision />
      3 位小数
      <NumberFlip count={count} precision={3} />
      <Space>
        <Button type="primary" onClick={() => setCount((v) => v + 1)}>
          +1
        </Button>
        <Button onClick={() => setCount((v) => v - 1)}>-1</Button>
      </Space>
    </>
  )
}
```

### 自定义样式

<code src="./demo/index.tsx"></code>
