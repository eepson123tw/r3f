// @ts-nocheck
import { useThree, extend } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Stage } from '@react-three/drei'
import SupModal from './suspense/supmodal'
import Placeholder from './suspense/placeHolder.jsx'
import Hambuger from './suspense/hambuger.jsx'
import Fox from './suspense/fox.jsx'
extend({ OrbitControls: OrbitControls })

export default function Modal() {
  const cubeRef = useRef(false)
  const { camera, gl } = useThree() // get Three instance

  return (
    <>
      <color attach='background' args={['black']} />
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <Stage
        shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
        environment='sunset'
        preset='portrait'
        intensity={0.1}
      >
        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color='greenyellow' />
        </mesh>
        <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
          <SupModal></SupModal>
        </Suspense>

        <Hambuger scale={0.5} position-y={2}></Hambuger>
        <Fox></Fox>
      </Stage>
    </>
  )
}
