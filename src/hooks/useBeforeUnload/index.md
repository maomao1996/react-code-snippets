# useBeforeUnload 页面卸载弹出警告

用来监听当用户重新加载或关闭页面时显示浏览器警告的 `Hook`

## 示例

```jsx
import React, { useState, useRef } from 'react'
import { Button, Card } from 'antd'

import useBeforeUnload from './index'

export default () => {
  const [state, setState] = useState(true)

  useBeforeUnload(state, '您有尚未提交的数据，确认离开当前页面吗？')

  return (
    <div>
      {state && <p>请重新加载或关闭当前页面</p>}
      <Button type="primary" onClick={() => setState(v => !v)}>
        {state ? '关闭' : '开启'}
      </Button>
    </div>
  )
}
```
