import React, { useMemo, useCallback, CSSProperties } from 'react'

import NumberFlipItem from './NumberFlipItem'

import './index.less'

const string2Array = (value: string) => value.split('')
const isNumber = (value: unknown): value is number => typeof value === 'number'
const isTrue = (value: unknown): value is true => value === true

export type NumberFlipProps = {
  /** 滚动数字 */
  count: number
  /** 最小长度 */
  minLength?: number
  /** 组件高度 */
  height?: CSSProperties['height']
  /** 是否开启小数 传入 true 时默认两位小数 */
  precision?: boolean | number
}
/** 数字翻转动画组件 */
const NumberFlip: React.FC<NumberFlipProps> = ({
  count,
  minLength = 8,
  height = 30,
  precision = false
}) => {
  const padNumber = useCallback(
    (value: NumberFlipProps['count']) => {
      if (isNumber(precision) || isTrue(precision)) {
        const decimal = isTrue(precision) ? 2 : precision
        let [int, float = ''] = String(value / Number(`1e${decimal}`)).split('.')
        if (float.length < decimal) {
          float = float.padEnd(decimal, '0')
        }
        return `${int}.${float}`.padStart(minLength + 1, '0')
      } else {
        return String(value).padStart(minLength, '0')
      }
    },
    [precision, minLength]
  )

  const formatCount = useMemo(() => string2Array(padNumber(count)), [count])

  return (
    <div className="number-flip" style={{ height: height, lineHeight: `${height}px` }}>
      {formatCount.map((item, index) =>
        isNaN(Number(item)) ? (
          <div key={index} className="number-flip-item number-flip-string">
            {item}
          </div>
        ) : (
          <NumberFlipItem key={index} activeCount={item} />
        )
      )}
    </div>
  )
}

export default NumberFlip
