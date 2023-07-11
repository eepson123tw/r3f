// @ts-nocheck
import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject'
import Cube from './object/Cube'
extend({ OrbitControls: OrbitControls })

export default function Debug() {
  const { camera, gl } = useThree() // get Three instance

  useFrame((state, delta) => {})

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[2, 0, 0]} scale={1} rotation-y={Math.PI * 0.25}>
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>
      <Cube scale={3}></Cube>
    </>
  )
}
