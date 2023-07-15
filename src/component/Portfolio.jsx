// @ts-nocheck
import React, { useRef, Suspense } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useThree, extend } from '@react-three/fiber'
export default function Portfolio() {
  const cubeRef = useRef(false)
  const { camera, gl } = useThree() // g
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  )
}
