import React, { useCallback, useMemo } from 'react'
import { createStore } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'

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
interface Store {
  [key: string]: {
    visible: boolean
    params?: any
  }
}

interface OverlayProviderProps {
  children: React.ReactNode
}

const SHOW = 'overlay/show'
const HIDE = 'overlay/hide'

function overlayReducer(state = {}, action: ReducerAction): Store {
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

// 创建 store
const store = createStore<Store, ReducerAction, unknown, unknown>(overlayReducer)
export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}

const DEFAULT_EMPTY = {}
/**
 * Overlay 调用函数
 * 通过 overlayId 和组件关联
 */
export const useOverlay = (overlayId: string) => {
  const dispatch = useDispatch()

  const show = useCallback(
    (params: any) => {
      dispatch({ type: SHOW, payload: { overlayId, params } })
    },
    [overlayId, dispatch]
  )

  const hide = useCallback(() => {
    dispatch({ type: HIDE, payload: { overlayId } })
  }, [overlayId, dispatch])

  const { visible, params } = useSelector((s: Store) => s[overlayId] || DEFAULT_EMPTY)

  return useMemo(
    () =>
      ({
        visible,
        params,
        show,
        hide
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
