import React, { useRef } from 'react'

import useClickOutside from '../../hooks/useClickOutside'

type ClickOutsideProps = {
  onClickOutside: (e: MouseEvent | TouchEvent) => void
}
const ClickOutside: React.FC<ClickOutsideProps> = ({ onClickOutside, children }) => {
  const target = useRef(null)

  useClickOutside(target, onClickOutside)

  return <div ref={target}>{children}</div>
}

export default ClickOutside
