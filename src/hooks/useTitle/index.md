# useTitle

用来修改页面 `title` 的 `Hook`，会存入之前的 `title`，并在组件卸载的时候还原回去

## 示例

```jsx
import React, { useState } from 'react'
import useTitle from './index'
import { Button } from 'antd'

const Component = () => {
  useTitle('新标题')
  return <div style={{ padding: '20px' }}>假装我是一个页面组件</div>
}

export default () => {
  const [state, setState] = useState(false)

  const change = () => {
    setState(v => !v)
  }
  return (
    <>
      <Button type="primary" onClick={change}>
        切换页面标题
      </Button>
      {state && <Component></Component>}
    </>
  )
}
```

## API

```js
useTitle((title: string))
```
