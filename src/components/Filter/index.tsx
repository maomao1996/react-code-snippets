import React, { useState, useEffect, useMemo } from 'react'
import { Form, Row, Col, Space, Button } from 'antd'
import { FormProps, FormItemProps } from 'antd/es/form'
import { DownOutlined } from '@ant-design/icons'
import RcResizeObserver from 'rc-resize-observer'

import './index.less'

export type FormConfigItem = Partial<FormItemProps> & {
  /** FormItem name */
  name: string
  /** 表单项组件 */
  type: React.ComponentType
  /** 表单项占据的单元格大小 */
  colSize?: number
  /** 表单项组件配置 */
  customProps?: any
  /** 其他配置项 */
  [key: string]: any
}

/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = [
  // 520 以下宽度展示 1 个表单项
  [520, 1],
  // 520 ~ 720 宽度展示 2 个表单项
  [720, 2],
  // 720 ~ 1200 宽度展示 3 个表单项
  [1200, 3],
  // 1200 以上宽度展示 4 个表单项
  [Infinity, 4]
]

const getSpanConfig = (width: number, span?: number): number => {
  if (span && typeof span === 'number') {
    return span
  }

  const breakPoint = BREAKPOINTS.find(item => width < item[0])
  return 24 / breakPoint![1]
}

/** 过滤器组件 */
export interface FilterProps extends Omit<FormProps, 'layout' | 'children'> {
  /** 表单配置项 */
  config: FormConfigItem[]
  /** label 宽度 */
  labelWidth?: number | 'auto'
  /** 默认显示的表单控件数量 **/
  defaultColsNumber?: number
  /** 默认状态下是否折叠超出的表单项 */
  defaultCollapsed?: boolean
  /** 表单项宽度 */
  span?: number

  /** 提交表单时触发 */
  onSubmit?: (params: any) => void
  /** 重置表单时触发 */
  onReset?: () => void
}

const Filter: React.FC<FilterProps> = ({
  config,
  defaultColsNumber,
  defaultCollapsed = true,
  labelWidth = 100,
  span,
  initialValues,
  onSubmit,
  onReset,
  ...props
}) => {
  // 表单实例
  const [form] = Form.useForm()

  // 是否折叠超出的表单项
  const [collapse, setCollapse] = useState(defaultCollapsed)
  // 表单整体的宽度
  const [width, setWidth] = useState(1024)

  // 计算表单项在当前宽度下占据的栅格数
  const spanSize = useMemo(() => getSpanConfig(width, span), [width])
  // 计算当前应当展示的表单项数量
  const showLength = useMemo(() => {
    // 当配置了 defaultColsNumber 时直接返回
    if (defaultColsNumber) {
      return defaultColsNumber
    }
    // 根据表单项占据的栅格数计算，最少显示一个表单元件，同时 -1 是给搜索重置按钮留出位置
    return Math.max(1, 24 / spanSize - 1)
  }, [defaultColsNumber, spanSize])

  // 是否需要展示 collapse
  const isShowCollapse = config.length - 1 >= showLength

  useEffect(() => {
    initialValues && form.setFieldsValue(initialValues)
  }, [initialValues, form])

  // 点击搜索
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSubmit?.(values)
    } catch (error) {
      console.log('Filter', error)
    }
  }

  // 点击重置
  const handleReset = () => {
    form.resetFields()
    onReset?.()
  }

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={offset => {
        if (width !== offset.width) {
          setWidth(offset.width)
        }
      }}
    >
      <div className="filter">
        <Form
          form={form}
          labelCol={{ flex: labelWidth === 'auto' ? labelWidth : `0 0 ${labelWidth}px` }}
          initialValues={initialValues}
          onFinish={handleSubmit}
          {...props}
        >
          <Row>
            {config.map(({ type: Component, customProps, colSize, ...item }, index) => {
              // 计算每个表单项实际占据的栅格数，最大为 24
              const colSpan = Math.min(spanSize * (colSize || 1), 24)
              // 判断是否展示表单项，隐藏的表单项不用需要使用 Col 包裹，以免影响后续布局
              if (item.hidden || (collapse && index >= showLength)) {
                return (
                  <Form.Item
                    key={item.name || index}
                    {...item}
                    hidden={item.hidden || (collapse && index >= showLength)}
                  >
                    <Component {...customProps} />
                  </Form.Item>
                )
              }
              return (
                <Col key={item.name || index} span={colSpan}>
                  <Form.Item {...item}>
                    <Component {...customProps} />
                  </Form.Item>
                </Col>
              )
            })}
            <Col span={spanSize} className="filter-collapse">
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                  {isShowCollapse && (
                    <span className="link pointer" onClick={() => setCollapse(v => !v)}>
                      {collapse ? '展开' : '收起'}
                      <DownOutlined
                        style={{
                          marginLeft: '0.5em',
                          transition: '0.3s all',
                          transform: `rotate(${collapse ? 0 : 0.5}turn)`
                        }}
                      />
                    </span>
                  )}
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </RcResizeObserver>
  )
}

export default Filter
