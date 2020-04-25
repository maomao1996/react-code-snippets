import { defineConfig } from 'dumi'

export default defineConfig({
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ],
  // mode: 'site',
  base: '/react-code-snippets/',
  publicPath: '/react-code-snippets/',
  title: 'react-code-snippets',
  dynamicImport: {},
  hash: true,
  manifest: {}
  // more config: https://d.umijs.org/config
})
