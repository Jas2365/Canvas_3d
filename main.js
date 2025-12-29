import {
  clear,
  point,
  line,
  project,
  translate_z,
  rotate_xz,
  screen,
  get_delta_time,
  get_fps
} from "./window.js"
import colors from "./colors.js"


const vs = [
  { x:  0.25, y:  0.25, z: 0.25 },
  { x: -0.25, y:  0.25, z: 0.25 },
  { x: -0.25, y: -0.25, z: 0.25 },
  { x:  0.25, y: -0.25, z: 0.25 },

  { x:  0.25, y:  0.25, z: -0.25 },
  { x: -0.25, y:  0.25, z: -0.25 },
  { x: -0.25, y: -0.25, z: -0.25 },
  { x:  0.25, y: -0.25, z: -0.25 },
]

const fs = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7]
]


let dz = 1
let angle = 0

function frame(){
  const dt = get_delta_time()
  angle += Math.PI* dt/ 2
  clear()


  for(const f of fs){
    for(let i = 0; i < f.length; i++){
      const a = vs[f[i]];
      const b = vs[f[(i+1)%f.length]]
      line(
         screen(project(translate_z(rotate_xz(a,angle), dz))),
         screen(project(translate_z(rotate_xz(b,angle), dz)))
      )
    }
  }

  setTimeout(frame, 1000/get_fps());

}
setTimeout(frame, 1000/get_fps());

