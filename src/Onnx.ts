import { env } from 'onnxruntime-web'
import { SUPPORT_NAVIGATOR, consoleDebug } from './utils'
import { Assets } from './Assets'

export interface OnnxWasmPaths {
  'ort-wasm.wasm'?: string
  'ort-wasm-threaded.wasm'?: string
  'ort-wasm-simd.wasm'?: string
  'ort-wasm-simd-threaded.wasm'?: string
}

export interface OnnxOptions {
  debug?: boolean
  proxy?: boolean
  wasmPaths?: OnnxWasmPaths
}

export class Onnx {
  static wasmPaths: OnnxWasmPaths = {}

  protected static _capabilities?: Record<string, any>

  static get capabilities() {
    if (!this._capabilities) {
      this._capabilities = {
        simd: WebAssembly.validate(new Uint8Array([
          0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10,
          1, 8, 0, 65, 0, 253, 15, 253, 98, 11,
        ])),
        threads: (() => {
          try {
            new MessageChannel().port1.postMessage(new SharedArrayBuffer(1))
            return WebAssembly.validate(new Uint8Array([
              0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3,
              1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11,
            ]))
          } catch (e) {
            return false
          }
        })(),
        webgpu: SUPPORT_NAVIGATOR
          ? (navigator as any).gpu !== undefined
          : false,
        numThreads: SUPPORT_NAVIGATOR
          ? navigator.hardwareConcurrency ?? 4
          : 4,
      }
    }
    return this._capabilities
  }

  static async init(options: OnnxOptions = {}): Promise<void> {
    const capabilities = this.capabilities

    if (options.debug) {
      consoleDebug('Capabilities:', capabilities)
      env.debug = true
      env.logLevel = 'verbose'
    }

    env.wasm.numThreads = capabilities.numThreads
    env.wasm.simd = capabilities.simd
    env.wasm.proxy = options.proxy

    const _getWasmPath = async (name: keyof OnnxWasmPaths): Promise<string> => {
      if (options.wasmPaths && name in options.wasmPaths) {
        return options.wasmPaths[name]!
      }
      return await Assets.getObjectUrl(name)
    }

    env.wasm.wasmPaths = {
      'ort-wasm-simd-threaded.wasm': capabilities.simd && capabilities.threads
        ? await _getWasmPath('ort-wasm-simd-threaded.wasm')
        : undefined,
      'ort-wasm-simd.wasm': capabilities.simd && !capabilities.threads
        ? await _getWasmPath('ort-wasm-simd.wasm')
        : undefined,
      'ort-wasm-threaded.wasm': !capabilities.simd && capabilities.threads
        ? await _getWasmPath('ort-wasm-threaded.wasm')
        : undefined,
      'ort-wasm.wasm': !capabilities.simd && !capabilities.threads
        ? await _getWasmPath('ort-wasm.wasm')
        : undefined,
    }
  }
}
