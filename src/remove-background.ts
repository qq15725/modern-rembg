import { consoleDebug } from './utils'
import { ImageTensor } from './ImageTensor'
import { Model } from './Model'
import { Onnx } from './Onnx'
import { Assets } from './Assets'
import type { OnnxOptions } from './Onnx'
import type { ImageSource } from './ImageTensor'

export interface RemoveBackgroundOptions extends OnnxOptions {
  model?: BufferSource | string | URL
  resolution?: number
  output?: 'foreground' | 'mask' | 'background'
}

export async function removeBackground(
  imageSource: ImageSource,
  options: RemoveBackgroundOptions,
): Promise<Blob> {
  const {
    debug,
    resolution = 320,
    model: modelSource = await Assets.getObjectUrl('u2netp.onnx'),
  } = options
  debug && consoleDebug('Loading onnx runtime...')
  await Onnx.init(options)
  const imageTensor = await ImageTensor.from(imageSource)
  let resized = imageTensor.resize(resolution, resolution)
  debug && consoleDebug('Loading model...')
  const model = await Model.from(modelSource)
  await model.load()
  debug && consoleDebug('Processing...')
  const result = await model.run([
    resized.toBchwImageTensor().toTensor(),
  ])
  model.release()
  debug && consoleDebug('Compute inference completion', result)

  const stride = resolution * resolution
  switch (options.output ?? 'foreground') {
    case 'mask':
      resized = new ImageTensor(new Float32Array(4 * stride), [resolution, resolution, 4])
      for (let i = 0; i < 4 * stride; i += 4) {
        const idx = i / 4
        const alpha = result.data[idx]
        resized.data[i + 3] = alpha * 255
      }
      break
    case 'foreground':
      for (let i = 0; i < 4 * stride; i += 4) {
        const idx = i / 4
        const alpha = result.data[idx]
        resized.data[i + 3] = alpha * 255
      }
      break
    case 'background':
      for (let i = 0; i < 4 * stride; i += 4) {
        const idx = i / 4
        const alpha = result.data[idx]
        resized.data[i + 3] = (1.0 - alpha) * 255
      }
      break
  }

  return await resized.resize(imageTensor.dims[1], imageTensor.dims[0]).toBlob()
}
