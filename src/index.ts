import { TransformResult, PluginOption } from 'vite'
import fs from 'fs'
import path from 'path'

export default (): PluginOption => ({
  name: 'vite-plugin-txt',
  enforce: 'pre',
  transform(code, id): TransformResult {
    if (id.endsWith('.txt')) {
      const firstIndex = code.indexOf('"')
      const lastIndex = code.lastIndexOf('"')
      const paths = code.substring(firstIndex + 1, lastIndex).split('/').filter(path => path !== '')
      const txtPath = path.join(__dirname, '..', '..', '..', ...paths)
      const txt = fs.readFileSync(txtPath, 'utf8')
      return {
        code: 'export default ' + '`' + txt + '`',
        map: null,
      }
    } else {
      return { code, map: null }
    }
  },
})
