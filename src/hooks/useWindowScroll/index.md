# useWindowScroll

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
      <div>当前窗口的 scrollLeft : {x}</div>
      <div>当前窗口的 scrollTop : {y}</div>
    </>
  )
}
```

## API

```js
useWindowScroll(fn: ({ x, y }) => {})

const [{ x, y }] = useWindowScroll(fn)
```

### Result

| 参数     | 作用               |
| -------- | ------------------ |
| { x, y } | 当前窗口的滚动位置 |

### Params

| 参数 | 作用                                   |
| ---- | -------------------------------------- |
| fn   | 滚动触发后的回调，会传入当前的滚动位置 |
