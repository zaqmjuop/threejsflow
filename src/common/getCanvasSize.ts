export const getCanvasSize = () => {
  const part = Math.min(window.innerWidth / 16, window.innerHeight / 9)
  return { width: part * 16, height: part * 9 }
}
