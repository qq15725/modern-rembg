import { InferenceSession } from 'onnxruntime-web'
import { SUPPORT_URL } from './utils'

export type ModelSource = string | URL | BufferSource

export type ModelOptions = InferenceSession.SessionOptions

export class Model {
  protected _session?: InferenceSession

  constructor(
    protected _data: ArrayBuffer,
    protected _options?: ModelOptions,
  ) {
    //
  }

  static async from(source: ModelSource): Promise<Model> {
    let data: ArrayBuffer
    if (
      typeof source === 'string'
      || (SUPPORT_URL && source instanceof URL)
    ) {
      data = await fetch(source).then(rep => rep.arrayBuffer())
    } else if (ArrayBuffer.isView(source)) {
      data = (source as ArrayBufferView).buffer
    } else if (source instanceof ArrayBuffer) {
      data = source
    } else {
      throw new TypeError('Not supported model source')
    }
    return new Model(data)
  }

  async load(): Promise<this> {
    this._session = await InferenceSession.create(this._data, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
      executionMode: 'parallel',
      enableCpuMemArena: true,
      ...this._options,
    })
    return this
  }

  async release(): Promise<this> {
    await this._session?.release()
    return this
  }

  async run(inputs: Array<any>, options?: InferenceSession.RunOptions): Promise<any> {
    if (!this._session) {
      await this.load()
    }
    const feeds: Record<string, any> = {}
    this._session!.inputNames.forEach((inputName, i) => {
      feeds[inputName] = inputs[i]
    })
    const result = await this._session!.run(feeds, options)
    return result[this._session!.outputNames[0]] as any
  }
}
