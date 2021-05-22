# useStableCallback 稳定的 Callback

当 `useEffect` 和 `useCallback` 组合使用时，由于 `useCallback` 的依赖项变化也会导致 `useEffect` 执行，这种隐式依赖会带来 BUG 或隐患
