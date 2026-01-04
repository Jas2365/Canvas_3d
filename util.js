export const cube = (size = 1) => {
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

export const cube_conn = () => {
  return  [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
  ]
}
