import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react'

type ReducerAction =
  | {
      type: typeof SHOW
      payload: {
        overlayId: string
        params: any
      }
    }
  | {
      type: typeof HIDE
      payload: {
        overlayId: string
      }
    }
interface AccountState {
  [key: string]: boolean | any
}

interface OverlayProviderProps {
  children: React.ReactNode
}

const overlayCallbacks: { [key: string]: (value: any) => void } = {}
const defaultOverlay = {}
const SHOW = 'overlay/show'
const HIDE = 'overlay/hide'

function overlayReducer(state = defaultOverlay, action: ReducerAction): AccountState {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        [action.payload.overlayId]: {
          visible: true,
          params: action.payload.params
        }
      }
    case HIDE:
      return { ...state, [action.payload.overlayId]: { visible: false } }
    default:
      return state
  }
}

const OverlayContext = createContext<{
  store: AccountState
  dispatch: React.Dispatch<ReducerAction>
} | null>(null)

// 创建 Provider 并用 useReducer 管理数据
export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [store, dispatch] = useReducer(overlayReducer, defaultOverlay)

  return <OverlayContext.Provider value={{ store, dispatch }}>{children}</OverlayContext.Provider>
}

/**
 * Overlay 调用函数
 * 通过 overlayId 和组件关联
 */
export const useOverlay = (overlayId: string) => {
  const context = useContext(OverlayContext)

  // 防止 useOverlay 在 <OverlayProvider> 之外调用
  if (!context) {
    throw new Error('useOverlay must be used within a <OverlayProvider>')
  }

  const { store, dispatch } = context

  /** 显示 Overlay */
  const show = useCallback(
    (params: any) => {
      return new Promise(resolve => {
        overlayCallbacks[overlayId] = resolve
        dispatch({ type: SHOW, payload: { overlayId, params } })
      })
    },
    [overlayId]
  )

  /** 隐藏 Overlay */
  const hide = useCallback(() => {
    dispatch({ type: HIDE, payload: { overlayId } })
    delete overlayCallbacks[overlayId]
  }, [overlayId])

  /** 执行 show 方法的 resolve 回调 */
  const resolve = useCallback(
    (result: any) => {
      if (overlayCallbacks[overlayId]) {
        overlayCallbacks[overlayId](result)
        delete overlayCallbacks[overlayId]
      }
    },
    [overlayId]
  )

  const { visible, params } = useMemo(() => store[overlayId] || {}, [store, overlayId])

  return useMemo(
    () =>
      ({
        visible,
        params,
        show,
        hide,
        resolve
      } as const),
    [visible, params, show, hide]
  )
}

/**
 * Overlay 创建函数
 * 通过 overlayId 创建相关 state
 */
export const createOverlay = <T extends {}>(
  overlayId: string,
  Component: React.ComponentType<ReturnType<typeof useOverlay> & T>
) => {
  return (props: T) => {
    // 将调用 show 方法传递的参数解构并透传
    const { params, ...overlay } = useOverlay(overlayId)
    return <Component {...props} {...overlay} {...params} />
  }
}
