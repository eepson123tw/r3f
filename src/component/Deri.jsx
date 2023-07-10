// @ts-nocheck
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  Html,
  TransformControls,
  OrbitControls,
  PivotControls
} from '@react-three/drei'
export default function Deri() {
  const sphereRef = useRef()
  return (
    <>
      {/*  makeDefault*/}
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 2, 0]}
        depthTest={false}
        lineWidth={4}
        scale={100}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        fixed={true}
      >
        <mesh position={[2, 0, 0]} scale={1} rotation-y={Math.PI * 0.25}>
          <boxGeometry />
          <meshStandardMaterial color='mediumpurple' />
          <Html>Box</Html>
        </mesh>
      </PivotControls>
      {/* <TransformControls object={cubeRef} mode='rotate' /> */}
      <mesh position-x={-2} ref={sphereRef}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
        <Html>Sphere</Html>
      </mesh>
      <TransformControls object={sphereRef} mode='scale' />
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
        <Html position={[0, 0, 0]} wrapperClass='label' center>
          That's a plane 👍
        </Html>
      </mesh>
    </>
  )
}
