# useScroll

用于监听组件滚动的 `Hook`

## 示例

```jsx
/**
 * title: 组件滚动 demo
 */
import React from 'react'
import useScroll from './index'

export default () => {
  const [ref, { x, y }] = useScroll()

  return (
    <>
      <div>当前组件的 scrollLeft : {x}</div>
      <div>当前组件的 scrollTop : {y}</div>
      <div ref={ref} style={{ height: '25vh', overflow: 'auto' }}>
        <div style={{ width: '500vw', height: '500vh' }}>这是一个滚动组件</div>
      </div>
    </>
  )
}
```

## API

```js
const [ref] = useScroll(fn: ({ x, y }) => {})

const [ref, { x, y }] = useScroll()
```

### Result

| 参数     | 作用                          |
| -------- | ----------------------------- |
| ref      | 需要监听滚动事件的 `dom` 元素 |
| { x, y } | 滚动容器当前的滚动位置        |

### Params

| 参数 | 作用                                   |
| ---- | -------------------------------------- |
| fn   | 滚动触发后的回调，会传入当前的滚动位置 |
