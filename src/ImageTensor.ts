import { Tensor } from 'onnxruntime-web'
import { SUPPORT_BLOB, SUPPORT_FETCH, SUPPORT_URL } from './utils'

export type ImageSource = string | URL | ImageBitmapSource | BufferSource

export class ImageTensor {
  constructor(
    public readonly data: Float32Array,
    public readonly dims: readonly number[],
  ) {
    //
  }

  static async from(image: ImageSource): Promise<ImageTensor> {
    // URL to string
    if (SUPPORT_URL && image instanceof URL) {
      image = image.href
    }

    // string to Blob
    if (SUPPORT_FETCH && typeof image === 'string') {
      image = await fetch(image).then(rep => rep.blob())
    }

    // Blob to NdArray
    if (SUPPORT_BLOB) {
      if (image instanceof ArrayBuffer || ArrayBuffer.isView(image)) {
        image = new Blob([image])
      }

      if (image instanceof Blob) {
        const imageBitmap = await createImageBitmap(image)
        const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height)
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null
        ctx!.drawImage(imageBitmap, 0, 0)
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
        return new ImageTensor(new Float32Array(imageData.data), [imageBitmap.height, imageBitmap.width, 4])
      }
    }

    throw new TypeError('Not supported image source')
  }

  resize(newWidth: number, newHeight: number): ImageTensor {
    const [srcHeight, srcWidth, srcChannels] = this.dims
    const scaleX = srcWidth / newWidth
    const scaleY = srcHeight / newHeight

    const resized = new Uint8Array(srcChannels * newWidth * newHeight)
    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        for (let c = 0; c < srcChannels; c++) {
          const srcX = x * scaleX
          const srcY = y * scaleY
          const x1 = Math.floor(srcX)
          const x2 = Math.ceil(srcX)
          const y1 = Math.floor(srcY)
          const y2 = Math.ceil(srcY)

          const dx = srcX - x1
          const dy = srcY - y1

          const p1 = this.data[y1 * srcWidth * srcChannels + x1 * srcChannels + c]
          const p2 = this.data[y1 * srcWidth * srcChannels + x2 * srcChannels + c]
          const p3 = this.data[y2 * srcWidth * srcChannels + x1 * srcChannels + c]
          const p4 = this.data[y2 * srcWidth * srcChannels + x2 * srcChannels + c]

          const interpolatedValue
            = (1 - dx) * (1 - dy) * p1
            + dx * (1 - dy) * p2
            + (1 - dx) * dy * p3
            + dx * dy * p4

          resized[y * newWidth * srcChannels + x * srcChannels + c] = Math.round(interpolatedValue)
        }
      }
    }

    return new ImageTensor(new Float32Array(resized), [newHeight, newWidth, srcChannels])
  }

  toBchwImageTensor(
    mean: number[] = [128, 128, 128],
    std: number[] = [256, 256, 256],
  ): ImageTensor {
    const { data, dims } = this
    const [srcHeight, srcWidth, srcChannels] = dims
    const stride = srcHeight * srcWidth
    const float32Data = new Float32Array(3 * stride)
    // r_0, r_1, .... g_0,g_1, .... b_0
    for (let i = 0, j = 0; i < data.length; i += srcChannels, j += 1) {
      float32Data[j] = (data[i] - mean[0]) / std[0]
      float32Data[j + stride] = (data[i + 1] - mean[1]) / std[1]
      float32Data[j + stride + stride] = (data[i + 2] - mean[2]) / std[2]
    }
    return new ImageTensor(float32Data, [1, 3, srcHeight, srcWidth])
  }

  toBlob(
    quality = 0.8,
    format = 'image/png',
  ): Blob {
    const { data, dims } = this
    const [height, width] = dims

    switch (format) {
      case 'image/x-rgba8':
        return new Blob([data], { type: 'image/x-rgba8' })
      case 'image/png':
      case 'image/jpeg':
      case 'image/webp': {
        const imageData = new ImageData(
          new Uint8ClampedArray(data),
          width,
          height,
        )
        const canvas = new OffscreenCanvas(imageData.width, imageData.height)
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null
        ctx!.putImageData(imageData, 0, 0)
        return (canvas as any).convertToBlob({ quality, type: format })
      }
      default:
        throw new Error(`Invalid format: ${ format }`)
    }
  }

  toTensor(): any {
    return new Tensor('float32', this.data, this.dims)
  }
}
