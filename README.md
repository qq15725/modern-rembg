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
