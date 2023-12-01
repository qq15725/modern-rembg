import { basename, resolve } from 'path'
import { defineConfig } from 'vite'
import { browser, exports, module, name } from './package.json'

const resolvePath = (str: string) => resolve(__dirname, str)

export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'umd'],
      fileName: format => {
        if (format === 'es') return basename(module)
        if (format === 'umd') return basename(browser)
        if (format === 'cjs') return basename(exports['.'].require)
        return `${ name }.${ format }`
      },
      entry: resolvePath('./src/index.ts'),
      name: name.replace(/-(\w)/ig, (_, v) => v.toUpperCase()),
    },
  },
})
