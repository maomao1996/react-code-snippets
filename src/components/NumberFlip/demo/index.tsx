import React, { useState, useEffect } from 'react'

import NumberFlip from '../index'

import './index.less'

export default () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(v => v + 123)
    }, 1e3)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="demo">
      <NumberFlip count={count} height={42} precision />
    </div>
  )
}
