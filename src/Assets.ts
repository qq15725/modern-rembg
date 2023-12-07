export class Assets {
  static async createObjectURL(name: string): Promise<string> {
    let result
    let type
    switch (name) {
      case 'u2netp.onnx':
        // @ts-expect-error import
        result = await import('../models/u2netp.onnx')
        type = 'application/octet-steam'
        break
      case 'ort-wasm.wasm':
        // @ts-expect-error import
        result = await import('../node_modules/onnxruntime-web/dist/ort-wasm.wasm')
        type = 'application/wasm'
        break
      case 'ort-wasm-threaded.wasm':
        // @ts-expect-error import
        result = await import('../node_modules/onnxruntime-web/dist/ort-wasm-threaded.wasm')
        type = 'application/wasm'
        break
      case 'ort-wasm-simd.wasm':
        // @ts-expect-error import
        result = await import('../node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm')
        type = 'application/wasm'
        break
      case 'ort-wasm-simd-threaded.wasm':
        // @ts-expect-error import
        result = await import('../node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm')
        type = 'application/wasm'
        break
      default:
        throw new Error(`Not supported asset ${ name }`)
    }
    return URL.createObjectURL(new Blob([result.default], { type }))
  }

  static objectUrls = new Map<string, string>()

  static async getObjectUrl(name: string): Promise<string> {
    if (!this.objectUrls.has(name)) {
      this.objectUrls.set(name, await this.createObjectURL(name))
    }
    return this.objectUrls.get(name)!
  }

  static release(): void {
    this.objectUrls.forEach(url => {
      URL.revokeObjectURL(url)
    })
    this.objectUrls.clear()
  }
}
