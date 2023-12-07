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
  model: '/you-custom-model.onnx', // default use u2netp.onnx
  resolution: 320, // model resolution
}).then(blob => {
  window.open(URL.createObjectURL(blob))
})
```

## Open source models

| Output                                                                                                                    | Model                                                                                                           | Resolution | Size(MB) | From                                                                          |
|---------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|----------|-------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/example.jpb" width="100" />                |                                                                                                                 |            |          |                      |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/u2net.onnx.png" width="100" />             | [u2net.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx)                          | 320        | 168      | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/u2netp.onnx.png" width="100" />            | [u2netp.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx)                        | 320        | 4        | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/u2net_human_seg.onnx.png" width="100" />   | [u2net_human_seg.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx)      | 320        | 168      | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/u2net_cloth_seg.onnx.png" width="100" />   | [u2net_cloth_seg.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_cloth_seg.onnx)      | 768        | 168      | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/silueta.onnx.png" width="100" />           | [silueta.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/silueta.onnx)                      | 320        | 42       | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/isnet-general-use.onnx.png" width="100" /> | [isnet-general-use.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-general-use.onnx)  | 320        | 170      | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/isnet-anime.onnx.png" width="100" />       | [isnet-anime.onnx](https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-anime.onnx)              | 1024       | 168      | [danielgatis/rembg](https://github.com/danielgatis/rembg)                     |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/large.png" width="100" />                  | [large](https://github.com/imgly/background-removal-js/raw/main/bundle/models/large?download=)                  | 1024       | 176      | [imgly/background-removal-js](https://github.com/imgly/background-removal-js) |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/medium.png" width="100" />                 | [medium](https://github.com/imgly/background-removal-js/raw/main/bundle/models/medium?download=)                | 1024       | 88       | [imgly/background-removal-js](https://github.com/imgly/background-removal-js) |
| <img src="https://raw.githubusercontent.com/qq15725/modern-rembg/main/examples/small.png" width="100" />                  | [small](https://github.com/imgly/background-removal-js/raw/main/bundle/models/small?download=)                  | 1024       | 44       | [imgly/background-removal-js](https://github.com/imgly/background-removal-js) |

