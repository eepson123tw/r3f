// @ts-nocheck
import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Stage } from '@react-three/drei'
extend({ OrbitControls: OrbitControls })

export default function Modal() {
  const cubeRef = useRef(false)
  const { camera, gl } = useThree() // get Three instance

  // useFrame((state, delta) => {
  //   state.camera.zoom = 100
  //   return () => {
  //     state.camera.zoom = 100
  //   }
  // }, [])

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <Stage
        shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
        environment='sunset'
        preset='portrait'
        intensity={0.8}
      >
        <mesh position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color='orange' />
        </mesh>

        <mesh ref={cubeRef} position-y={1} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color='mediumpurple' />
        </mesh>

        <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color='greenyellow' />
        </mesh>
      </Stage>
    </>
  )
}
