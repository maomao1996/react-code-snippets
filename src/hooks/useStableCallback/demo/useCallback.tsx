import React, { useState, useEffect, useCallback } from 'react'
import { Form, Input, Switch } from 'antd'

export default () => {
  const [title, setTitle] = useState('我是使用 useCallback 的组件')
  const [data, setData] = useState(() => Math.random())

  // 获取需要上传的信息
  const getUpdateData = useCallback(() => {
    console.log('data', data, title)

    return {
      date: new Date().toLocaleString(),
      title,
      data
    }
  }, [title, data])

  // 上传当前标题
  const handleUpdate = useCallback(() => {
    console.log('useCallback：上传信息成功:', getUpdateData())
  }, [getUpdateData])

  // 当 title 改变时上传信息
  useEffect(() => {
    console.log('useCallback：useEffect 调用了')
    handleUpdate()
  }, [title, handleUpdate])

  return (
    <>
      <Form>
        <Form.Item label="标题">
          <Input value={title} onChange={event => setTitle(event.target.value)} />
        </Form.Item>
        <Form.Item label="假装修改 data">
          <Switch onChange={() => setData(Math.random())} />
        </Form.Item>
      </Form>
    </>
  )
}
