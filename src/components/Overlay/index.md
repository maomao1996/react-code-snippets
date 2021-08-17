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

  return (
    <Button type="primary" onClick={() => overlay.show()}>
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

## 性能问题

当 `Provider` 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。`Provider` 及其内部 `consumer` 组件都不受制于 `shouldComponentUpdate` 函数，因此当 `consumer` 组件在其祖先组件退出更新的情况下也能更新。

[Context.Provider 文档](https://zh-hans.reactjs.org/docs/context.html#contextprovider)

### Context 案例

> 展示任何一个弹窗会触发所有组件的重新渲染（F12 查看控制台信息）

```jsx
import React from 'react'
import { Button, Modal } from 'antd'
import 'antd/dist/antd.css'

import { OverlayProvider, useOverlay, createOverlay } from './index.tsx'

const ModalOverlay1 = createOverlay('ModalOverlay1', ({ visible, hide, resolve }) => {
  console.log('Context: 弹窗一 log')
  return (
    <Modal visible={visible} onCancel={hide} onOk={hide} title="简单示例">
      这是弹窗一
    </Modal>
  )
})

const Page1 = () => {
  console.log('Context: Page1 log')
  const overlay = useOverlay('ModalOverlay1')

  return (
    <Button type="primary" onClick={() => overlay.show()}>
      打开弹窗一
    </Button>
  )
}

const ModalOverlay2 = createOverlay('ModalOverlay2', ({ visible, hide, resolve }) => {
  console.log('Context: 弹窗二 log')
  return (
    <Modal visible={visible} onCancel={hide} onOk={hide} title="简单示例">
      这是弹窗二
    </Modal>
  )
})

const Page2 = () => {
  console.log('Context: Page2 的 log')
  const overlay = useOverlay('ModalOverlay2')

  return (
    <Button type="primary" onClick={() => overlay.show()}>
      打开弹窗一
    </Button>
  )
}

export default () => {
  return (
    <OverlayProvider>
      <Page1 />
      <ModalOverlay1 />
      <br />
      <br />
      <Page2 />
      <ModalOverlay2 />
    </OverlayProvider>
  )
}
```

### Redux 案例

```jsx
import React from 'react'
import { Button, Modal } from 'antd'
import 'antd/dist/antd.css'

import { OverlayProvider, useOverlay, createOverlay } from './reduxOverlay.tsx'

const ModalOverlay1 = createOverlay('ModalOverlay1', ({ visible, hide, resolve }) => {
  console.log('Redux: 弹窗一 log')
  return (
    <Modal visible={visible} onCancel={hide} onOk={hide} title="简单示例">
      这是弹窗一
    </Modal>
  )
})

const Page1 = () => {
  console.log('Redux: Page1 log')
  const overlay = useOverlay('ModalOverlay1')

  return (
    <Button type="primary" onClick={() => overlay.show()}>
      打开弹窗一
    </Button>
  )
}

const ModalOverlay2 = createOverlay('ModalOverlay2', ({ visible, hide, resolve }) => {
  console.log('Redux: 弹窗二 log')
  return (
    <Modal visible={visible} onCancel={hide} onOk={hide} title="简单示例">
      这是弹窗一
    </Modal>
  )
})

const Page2 = () => {
  console.log('Redux: Page2 log')
  const overlay = useOverlay('ModalOverlay2')

  return (
    <Button type="primary" onClick={() => overlay.show()}>
      打开弹窗二
    </Button>
  )
}

export default () => {
  return (
    <OverlayProvider>
      <Page1 />
      <ModalOverlay1 />
      <br />
      <br />
      <Page2 />
      <ModalOverlay2 />
    </OverlayProvider>
  )
}
```
