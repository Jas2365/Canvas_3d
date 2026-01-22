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
const cs2 = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3]
]
const face1 = [
    {x:  0.2, y:  0.2},
    {x: -0.2, y:  0.2},
    {x: -0.2, y: -0.2},
    {x:  0.2, y: -0.2},

]
const face4 = [
    {x:  0.5, y:  0.5},
    {x: -0.5, y:  0.5},
    {x: -0.5, y: -0.5},
    {x:  0.5, y: -0.5},

]
const face2 = [
    {x:  0.2, y:  0.2},
    {x: -0.2, y:  0.2},
    {x: -0.2, y: -0.2},
    {x:  0.2, y: -0.2},

]
const face3 = [
    {x:  0.5, y:  0.5},
    {x: -0.5, y:  0.5},
    {x: -0.5, y: -0.5},
    {x:  0.5, y: -0.5},
]

let dt = 0.005
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

// let fl = 0
// let fr = 0
// const move_right_fl = (fa) => {
//     fa[1].x += dt
//     fa[2].x += dt
// }
// const move_right_fr = (fa) => {
//     fa[0].x += dt
//     fa[3].x += dt
// }
// //===================================
// const move_left_fl = (fa) => {
//     fa[1].x -= dt
//     fa[2].x -= dt
// }
// const move_left_fr = (fa) => {
//     fa[0].x -= dt
//     fa[3].x -= dt
// }
// //===================================
//
// const move_up_fl = (fa) => {
//     fa[1].y += dt
//     fa[2].y -= dt
// }
// const move_up_fr = (fa) => {
//     fa[0].y += dt
//     fa[3].y -= dt
// }
// //=================
// const move_down_fl = (fa) => {
//     fa[1].y -= dt
//     fa[2].y += dt
// }
// const move_down_fr = (fa) => {
//     fa[0].y -= dt
//     fa[3].y += dt
// }
// // =======================
// const move_d_up_fl = (fa) => {
//     move_left_fl(fa)
//     move_up_fl(fa)
// }
// const move_d_up_fr = (fa) => {
//     move_left_fr(fa)
//     move_up_fr(fa)
// }
// //===================
// const move_d_down_fl = (fa) => {
//     move_left_fl(fa)
//     move_down_fl(fa)
// }
// const move_d_down_fr = (fa) => {
//     move_left_fr(fa)
//     move_down_fr(fa)
// }

// const fun_move_x_right = () => {
//     face1[1].x += dt
// }
// const fun_move_x_left = () => {
//     face1[1].x -= dt
// }
// const fun_move_y_up = () => {
//     face1[1].y += dt
// }
// const fun_move_y_down = () => {
//     face1[1].y -= dt
// }
// const fun_dia_move_up =() => {
//     fun_move_x_left()
//     fun_move_y_up()
// }
// const fun_dia_move_down = () => {
//     fun_move_x_left()
//     fun_move_y_down()
// }

const draw_line = ([l1, l2], color) => {
    line(
        screen(project(l1)),
        screen(project(l2)),
        color
    )
}

const draw_square = (vs, cs, color) => {
     for(let i = 0; i< cs.length; i++){
        line(
            screen((vs[cs[i]])),
            screen((vs[cs[(i+1 )% cs.length]])),
            color
        )
    }
}

const draw_connections = (fa1, fa2, conn, color) => {
    for(const cs of conn){
        for(let i = 0 ; i< cs.length; i++){
        const a = fa1[cs[i]]
        const b = fa2[cs[(i+1)% cs.length]]
        line(
            screen(a),
            screen(b),
            color
        )
      }
    }
}

const draw_cube = (fa1, fa2, conn1, conn2, color) => {
    draw_square(fa1, conn1, color)
    draw_connections(fa1, fa2, conn2, color)
    draw_square(fa2, conn1, color)
}


let fx = 0
const frame = () => {
  
    // claculations before the frame
    // dt = 1/get_fps()
    // dt /= 2
    // if(fl){
    //     face1[0].x -= dt
    // }else {
    //     face1[0].x += dt
    // }
    // if(face1[1].x < -2) {
    //     fl = 1
    // }
    // if(face1[1].x > 2 && face1[1].y > 2 ) {
    //     fl = 2
    // }
    // if(face1[1].y < 1) {
    //     fl = 3
    // }
    // if(face1[1].x < -1 && face1[1].y < 2){
    //     fl = 0
    // }
    // if(fl == 0) { 
    //     move_d_up_fl(face1)
    // } else if(fl == 1) {
    //     move_right_fl(face1)
    // } else if (fl == 2) {
    //     move_d_down_fl(face1)
    // } else if (fl == 3) {
    //     move_left_fl(face1)
    // }
    // if(face1[0].x <= -1){
    //     fr = 1
    // }
    // if(face1[0].y >= 2){
    //     fr = 2
    // }
    // if(face1[0].x >= 2 && face1[0].y >= 2){
    //     fr = 3
    // }
    // if(face1[0].x >=1 && face1[0].y <= 1){
    //     fr = 0
    // }
    // if(fr == 0){
    //     move_left_fr(face1)
    // }
    //  else if(fr == 1){
    //     move_d_up_fr(face1)
    // }
    // else if(fr == 2){
    //     move_right_fr(face1)
    // }
    // else if(fr == 3) {
    //     move_d_down_fr(face1)
    // }

    // console.log(face1[0].x, face1[3].x)
    
    // dirfn(dz)
    //
    // if(dir){
    //     dz += dt
    //
    //
    // }else {
    //     dz -= dt
    //    
    // }
    // dirfn(dz)
    // if(dir) {
    //
    //     dz += dt 
    //     // face_fn_f()
    //     // face2_fn_f()
//
  //
     //     
    // } else {     
    //     dz -= dt 
    //     // face_fn_d()        
    //     // face2_fn_d()        
       // 
    // }
//

    // black screen 
    
    //  front and back
//    if(face1[0].x <= 0.2){
//     fx = 1
//    }
//    if(face1[0].x >= 0.5){
//     fx = 0
//    }

//      if(fx == 0){
//         face1[0].x -= dt
//         face1[0].y -= dt
    
//         face1[1].x += dt
//         face1[1].y -= dt
    
//         face1[2].x += dt
//         face1[2].y += dt
    
//         face1[3].x -= dt
//         face1[3].y += dt
        
//         face4[0].x += dt
//         face4[0].y += dt
    
//         face4[1].x -= dt
//         face4[1].y += dt
    
//         face4[2].x -= dt
//         face4[2].y -= dt
    
//         face4[3].x += dt
//         face4[3].y -= dt


//     } else if(fx == 1) {
//         face4[0].x -= dt
//         face4[0].y -= dt
    
//         face4[1].x += dt
//         face4[1].y -= dt
    
//         face4[2].x += dt
//         face4[2].y += dt
    
//         face4[3].x -= dt
//         face4[3].y += dt
        
//         face1[0].x += dt
//         face1[0].y += dt
    
//         face1[1].x -= dt
//         face1[1].y += dt
    
//         face1[2].x -= dt
//         face1[2].y -= dt
    
//         face1[3].x += dt
//         face1[3].y -= dt

//     }

    clear()

    // drawing board 

    // draw_square(face2, cs1, colors.cyan)
    // draw_connections(face2, face3, cs2, colors.magenta)
    // draw_square(face3, cs1, colors.cyan)
    draw_cube(face3, face2, cs1, cs2, colors.cyan)

    // draw_square(face4, cs1, colors.magenta)
    // draw_square(face1, cs1, colors.magenta)

    // draw_connections(face1, face4, cs2, colors.light_green)

   setTimeout(frame, 1000/get_fps())
}
setTimeout(frame, 1000/get_fps())

