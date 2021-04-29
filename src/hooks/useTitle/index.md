# useTitle 修改页面 title

用来修改页面 `title` 的 `Hook`，会存入之前的 `title`，并在组件卸载时还原之前的 `title`

## 示例

```jsx
import React, { useState } from 'react'
import useTitle from './index'

const Component = () => {
  useTitle('我是新标题')
  return <div style={{ padding: '20px' }}>修改页面 title 为我是新标题</div>
}

export default () => {
  const [state, setState] = useState(false)

  const handleClick = () => {
    setState(v => !v)
  }

  return (
    <>
      <button type="primary" onClick={handleClick}>
        切换页面标题
      </button>
      {state && <Component></Component>}
    </>
  )
}
```
