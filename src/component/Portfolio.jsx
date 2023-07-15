// @ts-nocheck
import React, { useRef, Suspense, useState } from 'react'
import { useThree, extend } from '@react-three/fiber'
import {
  Text,
  Html,
  ContactShadows,
  useGLTF,
  Environment,
  Float,
  PresentationControls
} from '@react-three/drei'

export default function Portfolio() {
  const phone = useGLTF('phone.gltf')

  return (
    <>
      <color attach='background' args={['#241a1a']} />
      <Environment preset='city' />
      <ContactShadows
        color='#241a1a'
        position-y={-4}
        opacity={0.4}
        scale={5}
        blur={5}
      ></ContactShadows>
      <PresentationControls
        global={false}
        rotation={[0.13, 0.1, 0]}
        polar={[-0.8, 0.8]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#ff6900'}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, 1]}
          />
          <primitive
            object={phone.scene}
            scale={2.5}
            position-y={-4}
            rotation-x={-0.256}
          >
            <Html
              transform
              wrapperClass='htmlScreen'
              distanceFactor={1.17}
              position={[0.17, 1.33, 0.1]}
              // rotation-x={-0.256}
            >
              <iframe src='https://portfolio.zeabur.app/' />
            </Html>
          </primitive>
          <Text
            font='./silkscreen-v1-latin_latin-ext-regular.woff'
            fontSize={1}
            position={[6, 0.75, 0.75]}
            rotation-y={-0.25}
            maxWidth={2}
          >
            Allen Shih
          </Text>
        </Float>
      </PresentationControls>
    </>
  )
}
