
import colors from "./colors.js"

const wnd_can = canvas_window
const wnd_can_w = 800
const wnd_can_h = 800

wnd_can.width = wnd_can_w
wnd_can.height = wnd_can_h

const ctx = wnd_can.getContext("2d")

let global_fps = 60

export const set_fps = (fps) => {
    global_fps = fps
}
export const get_fps = () => global_fps

export const get_delta_time = () => {
  return 1/global_fps
}

export const clear = () => {
  ctx.fillStyle = colors.black
  ctx.fillRect(0, 0, wnd_can_w, wnd_can_h)
}
export const point = ({x, y}) => {
  const s = 20
  ctx.fillStyle = colors.light_green
  ctx.fillRect(x - s/2, y - s/2, s, s)
}

export const line = (p1, p2) => {
  ctx.lineWidth = 3
  ctx.strokeStyle = colors.light_green
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}

export const screen = (p) => {
  // -1...1 => 0..2 => 0..1 => 0..w
  return {
    x: (p.x + 1)/2 * wnd_can_w,
    y: (1 - (p.y + 1)/2 ) * wnd_can_h,
  }
}

export const project = ({x, y, z}) => {
  return {
    x: x/z,
    y: y/z,
  }
}

export const translate_z = ({x, y, z}, dz) => {
  return {x, y, z: z + dz}
}

export const rotate_xz = ({x, y, z}, angle) => {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x: x*c - z*s,
    y,
    z: x*s + z*c,
  }
}

