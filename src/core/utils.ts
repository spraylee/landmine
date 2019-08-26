export function createList<T>(length: number, createMethod: (index: number) => T) {
  return [...Array(length)].map((a, j) => createMethod(j))
}

export function sleep(timeout: number) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export function untilRender() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}
