import {
  clear,
  point,
  line,
  project,
  translate_z,
  rotate_xz,
  rotate_opp_xz,
  rotate_xy,
  rotate_opp_xy,
  rotate_zy,
  rotate_opp_zy,
  screen,
  get_delta_time,
  get_fps
} from "./window.js"

const cube = (size = 1) => {
  size *= 0.1
  return [
    // front face
    { x:  size, y:  size, z: size },
    { x: -size, y:  size, z: size },
    { x: -size, y: -size, z: size },
    { x:  size, y: -size, z: size },
    // back face
    { x:  size, y:  size, z: -size },
    { x: -size, y:  size, z: -size },
    { x: -size, y: -size, z: -size },
    { x:  size, y: -size, z: -size },
  ]
}

const cube_vector = []

let vs = cube(2.3)
// cube_vector.push(_c23)


const cube_conn = () => {
  return  [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
  ]
}

const put_cube_in_array = () => {
  const s = parseFloat(cube_size.value)
  cube_vector.push(cube(s))
  console.log(cube_vector)

  
}
const showoutput = () => {
  console.log(cube_vector) 
}

const move_cube_up    =()=>{for(let v of vs) {v.y += 0.05}}
const move_cube_down  =()=>{for(let v of vs) {v.y -= 0.05}}
const move_cube_left  =()=>{for(let v of vs) {v.x -= 0.05}}
const move_cube_right =()=>{for(let v of vs) {v.x += 0.05}}
const move_cube_front =()=>{for(let v of vs) {v.z -= 0.05}}
const move_cube_back  =()=>{for(let v of vs) {v.z += 0.05}}


cube_size_btn .addEventListener("click", console.log("disabled for now")) // put_cube_in_array)
output_cube   .addEventListener("click",console.log("disabled for now")) // showoutput)

c_up    .addEventListener("click", move_cube_up)
c_down  .addEventListener("click", move_cube_down)
c_left  .addEventListener("click", move_cube_left)
c_right .addEventListener("click", move_cube_right)
c_front .addEventListener("click", move_cube_front)
c_back  .addEventListener("click", move_cube_back)

const fs = cube_conn()
let dz = 1

let x_angle = 0
let y_angle = 0
let z_angle = 0

const dt = get_delta_time()


let cx_angle = 0
let cxa_angle = 0

const rotate_cx = () => {
  cx_angle = 10* Math.PI/360
  vs = vs.map(v => rotate_zy(v, cx_angle))
}
const rotate_cxa = () => {
  cxa_angle = 10* Math.PI/360
  vs = vs.map(v => rotate_opp_zy(v, cxa_angle))
}

let cy_angle = 0
let cya_angle = 0

const rotate_cy = () => {
  cy_angle  = 10* Math.PI/360
  vs = vs.map(v => rotate_xz(v, cy_angle))
}
const rotate_cya = () => {
  cya_angle = 10* Math.PI/360
  vs = vs.map(v => rotate_opp_xz(v, cya_angle))
}
let cz_angle = 0
let cza_angle = 0

const rotate_cz = () => {
  cz_angle = 10* Math.PI/360
  vs = vs.map(v => rotate_xy(v, cz_angle))
}
const rotate_cza = () => {
  cza_angle = 10* Math.PI/360
  vs = vs.map(v => rotate_opp_xy(v, cza_angle))
}
let moving_cx = false
let _conn_rotate_cx_timer = null
let moving_cxa = false
let _conn_rotate_cxa_timer = null

let moving_cy = false
let _conn_rotate_cy_timer = null

let moving_cz = false
let _conn_rotate_cz_timer = null

const conn_rotate_cx = () => {
  moving_cx = !moving_cx
  moving_cxa = !moving_cxa
  const stepAngle = 2 * Math.PI / 360

  if (moving_cx) {
    const loop = () => {
      vs = vs.map(v => rotate_zy(v, stepAngle))
      _conn_rotate_cx_timer = setTimeout(() => {
        if (moving_cx) loop()
      }, 1000 / get_fps())
    }
    loop()
  } else {
    if (_conn_rotate_cx_timer) {
      clearTimeout(_conn_rotate_cx_timer)
      _conn_rotate_cx_timer = null
    }
  }
}
const conn_rotate_cz = () => {
  moving_cz = !moving_cz
  // moving_cza = !moving_cza
  const stepAngle = 2 * Math.PI / 360

  if (moving_cz) {
    const loop = () => {
      vs = vs.map(v => rotate_xy(v, stepAngle))
      _conn_rotate_cz_timer = setTimeout(() => {
        if (moving_cz) loop()
      }, 1000 / get_fps())
    }
    loop()
  } else {
    if (_conn_rotate_cz_timer) {
      clearTimeout(_conn_rotate_cz_timer)
      _conn_rotate_cz_timer = null
    }
  }
}
const conn_rotate_cy = () => {
  moving_cy = !moving_cy
  // moving_cya = !moving_cya
  const stepAngle = 2 * Math.PI / 360

  if (moving_cy) {
    const loop = () => {
      vs = vs.map(v => rotate_xz(v, stepAngle))
      _conn_rotate_cy_timer = setTimeout(() => {
        if (moving_cy) loop()
      }, 1000 / get_fps())
    }
    loop()
  } else {
    if (_conn_rotate_cy_timer) {
      clearTimeout(_conn_rotate_cy_timer)
      _conn_rotate_cy_timer = null
    }
  }
}

const conn_rotate_cxa = () => {
  moving_cx = !moving_cx
  moving_cxa = !moving_cxa
  const stepAngle = 2 * Math.PI / 360 
  if(moving_cxa) {
    const loopa = () => {
      vs = vs.map(v => rotate_opp_zy(v, stepAngle))
      _conn_rotate_cxa_timer = setTimeout(() => {
        if(moving_cxa) loopa() 
      }, 1000 / get_fps())
    }
    loopa()
  } else {
    if(_conn_rotate_cxa_timer) {
      clearTimeout(_conn_rotate_cxa_timer)
      _conn_rotate_cxa_timer = null
    }
  }
}


c_rotate_cx.  addEventListener("click", rotate_cx    )
c_rotate_acx. addEventListener("click", rotate_cxa   )
c_conn_rotate_cx.  addEventListener("click", conn_rotate_cx    )
c_conn_rotate_acx. addEventListener("click", conn_rotate_cxa   )
c_rotate_cy.  addEventListener("click", rotate_cy    )
c_rotate_acy. addEventListener("click", rotate_cya   )
c_conn_rotate_cy.  addEventListener("click", conn_rotate_cy    )
c_rotate_cz.  addEventListener("click", rotate_cz    )
c_rotate_acz. addEventListener("click", rotate_cza   )
c_conn_rotate_cz.  addEventListener("click", conn_rotate_cz    )




function frame(){
 
  
  clear()

  // only one cube is displaying
  // for(const vs of cube_vector) 
  for(const f of fs){
    for(let i = 0; i < f.length; i++){  
      const a = vs[f[i]];
      const b = vs[f[(i+1)%f.length]]
      line(
         screen(project(translate_z(a, dz))),
         screen(project(translate_z(b, dz)))
      )
    }
  }

  setTimeout(frame, 1000/get_fps());

}
setTimeout(frame, 1000/get_fps());

