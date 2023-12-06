export const PACKAGE_NAME = 'modern-rembg'
export const SUPPORT_URL = 'URL' in globalThis
export const SUPPORT_FETCH = 'fetch' in globalThis
export const SUPPORT_BLOB = 'Blob' in globalThis
export const SUPPORT_NAVIGATOR = 'navigator' in globalThis

// eslint-disable-next-line no-console
export const consoleDebug = (...args: Array<any>) => console.debug(`[${ PACKAGE_NAME }][${ new Date().toLocaleTimeString() }]`, ...args)
