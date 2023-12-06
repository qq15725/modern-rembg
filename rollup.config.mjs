// @ts-check
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import fs from 'fs-extra'

const entries = [
  'src/index.ts',
]

export default defineConfig([
  {
    input: entries,
    external: [
      'onnxruntime-web',
    ],
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: (f) => {
        return 'chunks/[name].mjs'
      },
    },
    plugins: [
      esbuild(),
      nodeResolve(),
      commonjs(),
      wasmPlugin(),
      onnxPlugin(),
    ],
  },
  {
    input: entries,
    output: {
      dir: 'dist',
      format: 'esm',
      chunkFileNames: 'types/[name].d.mts',
      entryFileNames: f => `${f.name.replace(/src[\\\/]/, '')}.d.mts`,
    },
    plugins: [
      dts({
        respectExternal: true,
      }),
      copy({
        targets: [
          { src: './models/u2netp.onnx', dest: 'dist' },
          { src: './node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm', dest: 'dist' },
          { src: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm', dest: 'dist' },
          { src: './node_modules/onnxruntime-web/dist/ort-wasm-threaded.wasm', dest: 'dist' },
          { src: './node_modules/onnxruntime-web/dist/ort-wasm.wasm', dest: 'dist' },
        ],
      }),
    ],
  },
])

export function wasmPlugin() {
  return {
    name: 'wasm',
    async load(id) {
      if (!id.endsWith('.wasm'))
        return
      const binary = await fs.readFile(id)
      const base64 = binary.toString('base64')
      return `export default Uint8Array.from(atob(${JSON.stringify(base64)}), c => c.charCodeAt(0))`
    },
  }
}

export function onnxPlugin() {
  return {
    name: 'onnx',
    async load(id) {
      if (!id.endsWith('.onnx'))
        return
      const binary = await fs.readFile(id)
      const base64 = binary.toString('base64')
      return `export default Uint8Array.from(atob(${JSON.stringify(base64)}), c => c.charCodeAt(0))`
    },
  }
}
