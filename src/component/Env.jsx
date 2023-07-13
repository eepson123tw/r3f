// @ts-nocheck
import { useThree, extend, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { useControls } from 'leva'
import {
  Sky,
  AccumulativeShadows,
  ContactShadows,
  BakeShadows,
  useHelper,
  Html,
  RandomizedLight,
  SoftShadows
} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
extend({ OrbitControls: OrbitControls })

export default function Env() {
  const { camera, gl } = useThree() // get Three instance
  const directionalLight = useRef()
  const controls = useRef()
  const cube = useRef()
  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#1d8f75',
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 }
  })
  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] }
  })
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    controls.current.update()
    directionalLight.current.position.x = 30 * Math.sin(time)
    console.log(directionalLight.current.position.x)
    cube.current.rotation.y += delta * 0.2
  })

  useLayoutEffect(() => {
    gl.setClearColor('#C1693C')
    return () => gl.setClearColor('lightgoldenrodyellow')
  }, [])

  return (
    <>
      <Sky sunPosition={sunPosition} />
      <BakeShadows />
      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      ></ContactShadows>
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color='#316d39'
        opacity={0.8}
        frames={Infinity}
        blend={100}
        temporal
      >
        <RandomizedLight
          ref={randomizedLight}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        ></RandomizedLight>
      </AccumulativeShadows> */}
      {/* <SoftShadows
        frustum={3.75}
        size={50}
        near={9.5}
        samples={17}
        rings={11}
      /> */}
      <orbitControls
        ref={controls}
        args={[camera, gl.domElement]}
        autoRotate={true}
        enableZoom={false}
      />
      <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} />

      <mesh scale={1} castShadow ref={cube}>
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>

      <mesh position-x={-2} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
        <Html position={[0, 0, 0]} wrapperClass='label' center>
          Env and Helper
        </Html>
      </mesh>
    </>
  )
}
