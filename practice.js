import colors from "./colors.js"
import { cube_conn } from "./util.js"
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
  draw_pxl,
  get_fps,
  get_wnd_w,
  get_wnd_h,
} from "./window.js"

const trans_x = ({x,y,z}, dx) => {
    return {x: x + dx, y, z}
}
const trans_y = ({x,y,z}, dy) => {
    return {x, y: y + dy, z}
}

const trans_xy = ({x,y,z}, dx, dy) => {
    return {x: x+ dx, y: y+dy, z}
}

let ps = [
    {x:  1, y:  1,  z: 1},
    {x: -1, y:  1,  z: 1},
    {x: -1, y: -1,  z: 1},
    {x:  1, y: -1,  z: 1},

    {x:  1, y:  1,  z: -1},
    {x: -1, y:  1,  z: -1},
    {x: -1, y: -1,  z: -1},
    {x:  1, y: -1,  z: -1},

]
const cs =  [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    // [0, 4],
    // [1, 5],
    // [2, 6],
    // [3, 7]
]
const cs1 = [0,1,2,3]
const face1 = [
    {x:  1, y:  1,  z: 4},
    {x: -1, y:  1,  z: 4},
    {x: -1, y: -1,  z: 4},
    {x:  1, y: -1,  z: 4},

]
const face2 = [
    {x:  1, y:  1,  z: 3},
    {x: -1, y:  1,  z: 3},
    {x: -1, y: -1,  z: 3},
    {x:  1, y: -1,  z: 3},

]

let dt = 0
let dx = 0
let dy = 0
let dz = 3
let dir = false
let dir2 = 0
let move = 0
const dirfn = (dz) => {
    if(dz > 5 || dz < 3) dir = !dir
    // console.log(dz)
}
const dir2fn = (move) => {
    if((move % 8) < 2) dir2 = 1 
    else if((move % 8) < 4) dir2 = 2 
    else if((move % 8) < 6) dir2 = 3 
    else if((move % 8) < 8) dir2 = 4 
    else dir2 = 0 
}

const face_fn_d = () => {
        
    face1[0].x -=dt
    face1[1].x +=dt
    face1[2].x +=dt
    face1[3].x -=dt
    
    face1[0].y -=dt
    face1[1].y -=dt
    face1[2].y +=dt
    face1[3].y +=dt

}
const face2_fn_f = () => {
    face2[0].x +=dt
    face2[1].x -=dt
    face2[2].x -=dt
    face2[3].x +=dt
    
    face2[0].y +=dt
    face2[1].y +=dt
    face2[2].y -=dt
    face2[3].y -=dt
        
}

const face2_fn_d = () => {
        face2[0].x +=dt
        face2[1].x -=dt
        face2[2].x -=dt
        face2[3].x +=dt
        
        face2[0].y +=dt
        face2[1].y +=dt
        face2[2].y -=dt
        face2[3].y -=dt

}
const face_fn_f = () => {

    face1[0].x +=dt
    face1[1].x -=dt
    face1[2].x -=dt
    face1[3].x +=dt
    
    face1[0].y +=dt
    face1[1].y +=dt
    face1[2].y -=dt
    face1[3].y -=dt
    
}

let fx = 0
let fy = 0
const fun_move_x_right = () => {
    face1[1].x += dt
}
const fun_move_x_left = () => {
    face1[1].x -= dt
}

const fun_move_y_up = () => {
    face1[1].y += dt
}
const fun_move_y_down = () => {
    face1[1].y -= dt
}

const fun_dia_move_up =() => {
    fun_move_x_left()
    fun_move_y_up()
}
const fun_dia_move_down = () => {
    fun_move_x_right()
    fun_move_y_down()
}
const frame = () => {
  
    // claculations before the frame

    dt = 1/get_fps()
    // dt /= 2



    // if(fx){
    //     face1[0].x -= dt
    // }else {
    //     face1[0].x += dt
    // }


    if(face1[1].x < -2) {
        fx = 1
    }
    if(face1[1].x > 2 && face1[1].y > 2 ) {
        fx = 2
    }
    if(face1[1].y < 1) {
        fx = 3
    }
    if(face1[1].x < -2 && face1[1].y < 2){
        fx = 0
    }
    
    
    

    if(fx == 0) { 
        // fun_dia_move_up()
        fun_move_x_left()
        fun_move_y_up()
    } else if(fx == 1) {
        fun_move_x_right()
    } else if (fx == 2) {
        // fun_move_x_left()
        face1[1].x -= dt
        fun_move_y_down()
    } else if (fx == 3) {
        fun_move_x_left()
    
    }


    // face1[2].x -= dt
    // face1[3].x -= dt

    console.log(face1[1].x, face1[1].y)
    
    // dirfn(dz)
    
    // if(dir){
    //     dz += dt


    // }else {
    //     dz -= dt
        
    // }
    // dirfn(dz)
    // if(dir) {

    //     dz += dt 
    //     // face_fn_f()
    //     // face2_fn_f()

        
       
    // } else {     
    //     dz -= dt 
    //     // face_fn_d()        
    //     // face2_fn_d()        
        
    // }

    // black screen 
    clear()

    // drawing board

    // for(const p of ps)
    //     point(screen(project(translate_z(p,dz))))
    
    // for(const l of cs){
    //     for(let i = 0; i< l.length; i++){
    //         const a = ps[l[i]]
    //         const b = ps[l[(i+1 )% l.length]]
    //         line(
    //             screen(project(translate_z(a,dz))),
    //             screen(project(translate_z(b,dz))),
    //             colors.light_green
    //         )
    //     }
    // }
    
    // for(let i = 0; i< cs1.length; i++){
    //     const a = face1[cs1[i]]
    //     const b = face1[cs1[(i+1 )% cs1.length]]
    //     line(
    //         screen(project(translate_z(a,dz))),
    //         screen(project(translate_z(b,dz))),
    //         colors.magenta
    //     )
    // }

    // for(let i = 0; i< cs1.length; i++){
    //     const a = face2[cs1[i]]
    //     const b = face2[cs1[(i+1 )% cs1.length]]
    //     line(
    //         screen(project(translate_z(a, -dz))),
    //         screen(project(translate_z(b, -dz))),
    //         colors.cyan
    //     )
    // }


    for(let i = 0; i< cs1.length; i++){
        const a = face1[cs1[i]]
        const b = face1[cs1[(i+1 )% cs1.length]]
        line(
            screen(project(a)),
            screen(project(b)),
            colors.magenta
        )
    }
    for(let i = 0; i< cs1.length; i++){
        const a = face2[cs1[i]]
        const b = face2[cs1[(i+1 )% cs1.length]]
        line(
            screen(project(a)),
            screen(project(b)),
            colors.cyan
        )
    }

    setTimeout(frame, 1000/get_fps())
}
setTimeout(frame, 1000/get_fps())

