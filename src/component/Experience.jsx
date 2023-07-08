// @ts-nocheck
import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject'
extend({ OrbitControls: OrbitControls })

export default function Experience() {
  const cubeRef = useRef(false)
  const groupRef = useRef(false)
  const { camera, gl } = useThree() // get Three instance

  useFrame((state, delta) => {
    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.lookAt(0, 0, 0)
    //call each frame
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta

      // state.camera.position.x
      // groupRef.current.rotation.y += delta
    }
  })

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <mesh
          ref={cubeRef}
          position={[2, 0, 0]}
          scale={1}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          <meshStandardMaterial color='mediumpurple' />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color='orange' />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>
      <CustomObject />
    </>
  )
}
