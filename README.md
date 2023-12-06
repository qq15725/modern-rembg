<h1 align="center">modern-rembg</h1>

<p align="center">
  <a href="https://unpkg.com/modern-rembg">
    <img src="https://img.shields.io/bundlephobia/minzip/modern-rembg" alt="Minzip">
  </a>
  <a href="https://www.npmjs.com/package/modern-rembg">
    <img src="https://img.shields.io/npm/v/modern-rembg.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/modern-rembg">
    <img src="https://img.shields.io/npm/dm/modern-rembg" alt="Downloads">
  </a>
  <a href="https://github.com/qq15725/modern-rembg/issues">
    <img src="https://img.shields.io/github/issues/qq15725/modern-rembg" alt="Issues">
  </a>
  <a href="https://github.com/qq15725/modern-rembg/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/modern-rembg.svg" alt="License">
  </a>
</p>

<p style="display: flex; align-items: center; justify-content: center;">
  <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/example.jpg" width="200" />
  <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/example.out.jpg" width="200" />
</p>

## 📦 Install

```shell
npm i modern-rembg

# peerDependencies
npm i onnxruntime-web
```

## 🦄 Usage

```ts
import { removeBackground } from 'modern-rembg'

removeBackground('/example.jpg').then(blob => {
  window.open(URL.createObjectURL(blob))
})
```

## Use custom model

```ts
import { removeBackground } from 'modern-rembg'

removeBackground('/example.jpg', {
  debug: true,
  model: '/you-custom-model.onnx',
  resolution: 320, // model resolution
}).then(blob => {
  window.open(URL.createObjectURL(blob))
})
```

## Models

| Model                                                                                                          | Resolution | From                                                                          |
|----------------------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------------|
| [u2net.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx)                         | 320        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| [u2netp.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx)                       | 320        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| [u2net_human_seg.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx)     | 320        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| [u2net_cloth_seg.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_cloth_seg.onnx)     | 320        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| [silueta.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/silueta.onnx)                     | 320        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| [isnet-general-use.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-general-use.onnx) | 320        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| [isnet-anime.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-anime.onnx)             | 320        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| [large](https://github.com/imgly/background-removal-js/raw/main/bundle/models/large?download=)                 | 1024       | [imgly/background-removal-js](https://github.com/imgly/background-removal-js) |
| [medium](https://github.com/imgly/background-removal-js/raw/main/bundle/models/medium?download=)               | 1024       | [imgly/background-removal-js](https://github.com/imgly/background-removal-js) |
| [small](https://github.com/imgly/background-removal-js/raw/main/bundle/models/small?download=)                 | 1024       | [imgly/background-removal-js](https://github.com/imgly/background-removal-js) |

