import { renderHook } from '@testing-library/react-hooks'

import useTitle from './index'

describe('useTitle', () => {
  it('should be defined', () => {
    expect(useTitle).toBeDefined()
  })

  it('should update document title', () => {
    const hook = renderHook(props => useTitle(props), { initialProps: '我是标题一' })
    expect(document.title).toBe('我是标题一')

    hook.rerender('我是标题二')
    expect(document.title).toBe('我是标题二')
  })

  it('should restore document title on unmount', () => {
    renderHook(props => useTitle(props), { initialProps: '旧标题' })
    expect(document.title).toBe('旧标题')

    const hook = renderHook(props => useTitle(props.title), {
      initialProps: { title: '新标题' }
    })
    expect(document.title).toBe('新标题')
    hook.unmount()
    expect(document.title).toBe('旧标题')
  })
})
