import React, { memo } from 'react'

const SOURCE = Array.from({ length: 10 }, (_, index) => String(index))

export type NumberFlipItemProps = {
  /** 当前滚动数字 */
  activeCount: string
}

const NumberFlipItem: React.FC<NumberFlipItemProps> = ({ activeCount }) => {
  const offset = SOURCE.findIndex(item => item === activeCount)
  return (
    <div className="number-flip-item number-flip-number">
      <div
        className="number-flip-item-wrap"
        style={{ transform: `translate3d(0, -${offset * 100}%, 0)` }}
      >
        {SOURCE.map(item => (
          <span className="number-flip-item-inner" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default memo(NumberFlipItem)
