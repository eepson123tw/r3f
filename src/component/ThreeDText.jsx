// @ts-nocheck
import {
  useMatcapTexture,
  OrbitControls,
  Text3D,
  Center,
  Float,
  Points,
  PointMaterial,
  Stars
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()
export default function ThreeDText(props) {
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
  const { numbers, text, rotationSpeed } = useControls('hambuger', {
    numbers: { value: 100, min: 0, max: 900, step: 100 },
    text: { value: 'HELLO,STAR!' },
    rotationSpeed: { value: 0.2, min: 0, max: 5, step: 0.01 }
  })
  const donutsGroup = useRef()

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true

    material.matcap = matcapTexture
    material.needsUpdate = true
  }, [])

  useFrame((state, delta) => {
    for (const donut of donutsGroup.current.children) {
      donut.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <>
      <OrbitControls makeDefault />
      <color attach='background' args={['black']} />
      <group ref={donutsGroup}>
        {[...Array(numbers)].map((item, index) => (
          <mesh
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            scale={0.1 + Math.random() * 0.002}
            geometry={torusGeometry}
          >
            <meshBasicMaterial wireframe color='#FEDFE1' />
          </mesh>
        ))}
      </group>
      <Center>
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Text3D
            font='/fonts/helvetiker_regular.typeface.json'
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {text}
            <meshMatcapMaterial matcap={matcapTexture} />
            {/* <meshBasicMaterial wireframe color='red' /> */}
          </Text3D>
        </Float>
      </Center>
    </>
  )
}
