# Overlay 弹出层

利用全局状态管理弹出层，将页面和弹出层分离

## 示例

### 简单示例

```jsx
import React from 'react'
import { Button, Modal } from 'antd'

import { OverlayProvider, useOverlay, createOverlay } from './index.tsx'

const ModalOverlay = createOverlay('ModalOverlay', ({ visible, hide, resolve }) => {
  return (
    <Modal visible={visible} onCancel={hide} onOk={hide} title="简单示例">
      这是一个弹窗
    </Modal>
  )
})

const Page = () => {
  const overlay = useOverlay('ModalOverlay')

  const handleClick = () => {
    overlay.show()
  }

  return (
    <Button type="primary" onClick={handleClick}>
      打开弹窗
    </Button>
  )
}

export default () => {
  return (
    <OverlayProvider>
      <Page />
      <ModalOverlay />
    </OverlayProvider>
  )
}
```

### 表单提交

```jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Modal, Table, Form, Input, Select, Space } from 'antd'

import { OverlayProvider, useOverlay, createOverlay } from './index.tsx'

const UserFormOverlay = createOverlay('UserFormOverlay', ({ visible, hide, resolve, user }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    visible && form.setFieldsValue(user || {})
  }, [form, visible, user])

  const handleSubmit = useCallback(() => {
    form.validateFields().then(values => {
      const data = { ...user, ...values }
      if (!user) {
        data.id = Date.now()
      }
      form.resetFields()
      resolve(data)
      hide()
    })
  }, [resolve, hide, user, form])

  const handleCancel = useCallback(() => {
    form.resetFields()
    hide()
  }, [form])

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      title={user ? '编辑信息' : '新增信息'}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="昵称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="等级" name="level">
          <Select>
            <Select.Option value="垃圾">垃圾</Select.Option>
            <Select.Option value="演员">演员</Select.Option>
            <Select.Option value="菜比">菜比</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})

const Page = () => {
  const { show } = useOverlay('UserFormOverlay')

  const [userList, setUserList] = useState([
    {
      id: 1,
      name: '狗仔强',
      level: '菜比'
    }
  ])

  const handleAdd = useCallback(() => {
    show().then(newUser => {
      setUserList(users => [...users, newUser])
    })
  }, [show])

  const handleEdit = useCallback(
    user => {
      show({ user }).then(newUser => {
        setUserList(users => {
          return users.map(item => {
            if (item.id === newUser.id) {
              return newUser
            }
            return item
          })
        })
      })
    },
    [show]
  )

  const columns = useMemo(() => {
    return [
      {
        title: '昵称',
        dataIndex: 'name'
      },
      {
        title: '等级',
        dataIndex: 'level'
      },
      {
        title: '操作',
        render(user) {
          return (
            <Button type="link" onClick={() => handleEdit(user)}>
              编辑
            </Button>
          )
        }
      }
    ]
  }, [show])

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          新增
        </Button>
      </Space>
      <Table size="small" pagination={false} columns={columns} dataSource={userList} rowKey="id" />
    </>
  )
}

export default () => {
  return (
    <OverlayProvider>
      <Page />
      <UserFormOverlay />
    </OverlayProvider>
  )
}
```
