# useStableCallback 稳定的 Callback

当 `useEffect` 和 `useCallback` 组合使用时，由于 `useCallback` 的依赖项变化也会导致 `useEffect` 执行，这种隐式依赖会带来 BUG 或隐患

## 示例

### 使用 useCallback

> 请打开控制台查看调用信息

`handleUpdate` 函数会在标题或者 `data` 改变时触发

在点击 `Switch` 组件时会触发 `handleUpdate` 函数的更新从而触发 `useEffect` 的调用最终产生隐式依赖

<code src="./demo/useCallback.tsx"></code>

### 使用 useStableCallback

`handleUpdate` 函数只会在标题改变时触发

在点击 `Switch` 组件时不会触发 `handleUpdate` 函数的更新从而触发 `useEffect` 的调用

<code src="./demo/useStableCallback.tsx"></code>
