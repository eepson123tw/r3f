import React from 'react'
import { useRef, useEffect } from 'react'
export default function ThreeDText(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial wireframe color='red' />
    </mesh>
  )
}
