// @ts-nocheck
import React, { useRef, Suspense, useState, useEffect } from 'react'
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
import { useApp } from '../store/app'

export default function Portfolio() {
  const phone = useGLTF('phone.gltf')
  const [{ windowWidth }] = useApp()
  const [scale, setScale] = useState(2.5)
  const [positionY, setPositionY] = useState(-4)
  useEffect(() => {
    if (windowWidth <= 600) {
      setScale(1.5)
      setPositionY(-3)
    }
  }, [windowWidth])

  return (
    <>
      <color attach='background' args={['#241a1a']} />

      <Suspense
        fallback={
          <Text
            font='./silkscreen-v1-latin_latin-ext-regular.woff'
            fontSize={1}
            position={[0, 0, 0]}
            rotation-y={0.45}
            maxWidth={2}
          >
            Loading...
          </Text>
        }
      >
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
              position={[0, 0.65, -1.15]}
            />
            <primitive
              object={phone.scene}
              scale={scale}
              position-y={positionY}
              rotation-x={-0.256}
            >
              <Html
                transform
                wrapperClass='htmlScreen'
                distanceFactor={1.17}
                position={[0.17, 1.33, 0.1]}
              >
                <iframe src='https://portfolio.zeabur.app/' />
              </Html>
            </primitive>
            <Text
              font='./silkscreen-v1-latin_latin-ext-regular.woff'
              fontSize={windowWidth >= 600 ? 1 : 0.5}
              position={windowWidth >= 600 ? [6, 0.75, 0.75] : [1, 3, 0]}
              rotation-y={windowWidth >= 600 ? -0.25 : 0}
              maxWidth={2}
            >
              Allen Shih
            </Text>
          </Float>
        </PresentationControls>
      </Suspense>
    </>
  )
}
useGLTF.preload('phone.gltf')
