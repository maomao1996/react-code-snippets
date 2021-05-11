# Filter 过滤器

## 示例

```jsx
import React from 'react'
import { Input, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import 'antd/dist/antd.css'

import Filter from './index'

const config = [
  {
    type: Input,
    name: 'name',
    label: '账号',
    initialValue: 'maomao',
    customProps: {
      placeholder: '请输入账号',
      prefix: <UserOutlined />
    }
  },
  {
    type: Select,
    name: 'select',
    label: '状态',
    initialValue: '',
    customProps: {
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未开始',
          value: 1
        },
        {
          label: '进行中',
          value: 2
        },
        {
          label: '已介绍',
          value: 3
        }
      ],
      placeholder: '请选择状态'
    }
  }
]

const handleSubmit = values => {
  console.log('values', values)
}

export default () => <Filter config={config} onSubmit={handleSubmit} />
```
