// @ts-nocheck
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import {
  Html,
  TransformControls,
  OrbitControls,
  PivotControls,
  Text,
  Float
} from '@react-three/drei'
export default function Deri() {
  const sphereRef = useRef()
  const cubeRef = useRef()
  const textRef = useRef()

  useFrame((state, delta) => {
    //call each frame
    if (textRef.current) {
      // textRef.current.rotation.y += delta
    }
  })
  return (
    <>
      {/*  makeDefault*/}
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={2} />
      <ambientLight intensity={0.2} />

      <PivotControls
        anchor={[0, 2, 0]}
        depthTest={false}
        lineWidth={4}
        scale={100}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        fixed={true}
      >
        <mesh
          position={[2, 0, 0]}
          scale={1}
          rotation-y={Math.PI * 0.25}
          ref={cubeRef}
        >
          <boxGeometry />
          <meshStandardMaterial color='mediumpurple' />
          <Html>Box</Html>
        </mesh>
      </PivotControls>
      {/* <TransformControls object={cubeRef} mode='rotate' /> */}
      <mesh position-x={-2} ref={sphereRef}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
        <Html
          position={[1, 1, 0]}
          wrapperClass='label'
          occlude={[sphereRef, cubeRef]}
          center
        >
          Sphere 2123123123
        </Html>
      </mesh>
      {/* <TransformControls object={sphereRef} mode='scale' /> */}
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={60}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color='#151515'
          metalness={0.5}
        />
        <Html position={[0, 0, 0]} wrapperClass='label' center>
          That's a plane 👍
        </Html>
      </mesh>
      <Float speed={5} floatIntensity={6}>
        <Text
          ref={textRef}
          maxWidth={2}
          position={[0, 4, 0]}
          fontSize={2}
          color='#0fc'
          textAlign='center'
          font='./silkscreen-v1-latin_latin-ext-regular.woff'
        >
          R3F WOW
          <meshNormalMaterial />
        </Text>
      </Float>
    </>
  )
}
