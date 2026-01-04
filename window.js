
import colors from "./colors.js"

const wnd_can = canvas_window
const wnd_can_w = 800
const wnd_can_h = 800




// wnd_can.width = cols * cell_size;
// wnd_can.height = rows * cell_size;

wnd_can.width = wnd_can_w
wnd_can.height = wnd_can_h

export const get_wnd_w = () => {return wnd_can.width }
export const get_wnd_h = () => {return wnd_can.heighth }


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
// export const point = ({x, y}, color = colors.light_green) => {
//   ctx.fillStyle = color
//   ctx.fillRect(x *cell_size, y *cell_size, cell_size, cell_size)
// }
export const point = ({x, y}, size = 10) => {
  const s = size
  ctx.fillStyle = colors.light_green
  ctx.fillRect(x - s/2, y - s/2, s, s)
}
export const draw_pxl = ({x, y}, size = 10, color = colors.light_green) => {
  const s = size
  ctx.fillStyle = colors.light_green
  ctx.fillRect(x, y, s, s)
}
export const line = (p1, p2, color = colors.light_green) => {
  ctx.lineWidth = 3
  ctx.strokeStyle = color
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
export const rotate_opp_xy = ({x, y, z}, angle) => {
  // Standard 2D rotation in the XY plane by `angle`:
  // [ x' ]   [ cos -sin ] [ x ]
  // [ y' ] = [ sin  cos ] [ y ]
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x: x*c - y*s,
    y: x*s + y*c,
    z,
  }
}
export const rotate_opp_xz = ({x, y, z}, angle) => {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x: x*c - z*s,
    y,
    z: x*s + z*c,
  }
}
export const rotate_opp_zy = ({x, y, z}, angle) => {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x,
    // rotation in the YZ plane by -angle (inverse rotation)
    // y' = y*c + z*s
    // z' = -y*s + z*c
    y: y*c + z*s,
    z: -y*s + z*c,
  }
}

export const rotate_xz = ({x, y, z}, angle) => {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x: x*c + z*s,
    y,
    z: -x*s + z*c,
  }
}
export const rotate_xy = ({x, y, z}, angle) => {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    // Rotation by -angle (inverse rotation)
    x: x*c + y*s,
    y: -x*s + y*c,
    z,
  }
}
export const rotate_zy = ({x, y, z}, angle) => {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x,
    // rotation in the YZ plane by +angle
    // y' = y*c - z*s
    // z' = y*s + z*c
    y: y*c - z*s,
    z: y*s + z*c,
  }
}

