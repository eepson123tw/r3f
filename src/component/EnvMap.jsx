// @ts-nocheck
import { useThree, extend, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useControls } from 'leva'
import { useLocation } from 'react-router-dom'
import {
  Stage,
  Environment,
  Lightformer,
  ContactShadows
} from '@react-three/drei'
extend({ OrbitControls: OrbitControls })
const deg2rad = (degrees) => degrees * (Math.PI / 180)
export default function EnvMap() {
  const cubeRef = useRef(false)
  const controls = useRef()
  const { camera, gl } = useThree() // get Three instance
  useThree(({ camera }) => {
    camera.rotation.set(deg2rad(30), 0, 20000)
  })
  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta
    }
    camera.zoom = 5
    controls.current.update()
  })

  useEffect(() => {
    return () => {
      camera.zoom = 100
    }
  }, [])

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls('environment map', {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 }
    })
  return (
    <>
      {/* <orbitControls args={[camera, gl.domElement]} />
      <Stage
        shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
        environment='sunset'
        preset='portrait'
        intensity={2}
      >
        <mesh position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color='orange' />
        </mesh>

        <mesh ref={cubeRef} position-y={1} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color='mediumpurple' />
        </mesh>
      </Stage> */}

      <Environment
        background
        preset='sunset'
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale
        }}
      >
        <color args={['#000000']} attach='background' />
        <Lightformer
          position-z={-5}
          scale={10}
          color='red'
          intensity={10}
          form='ring'
        ></Lightformer>
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      </Environment>
      <orbitControls ref={controls} args={[camera, gl.domElement]} />
      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
      />
      <mesh
        castShadow
        ref={cubeRef}
        position={[-2, 1, 0]}
        scale={1}
        rotation-y={Math.PI * 0.25}
      >
        <boxGeometry />
        <meshStandardMaterial
          color='mediumpurple'
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      <mesh castShadow scale={1.5} position-y={1} position-x={2}>
        <sphereGeometry />
        <meshStandardMaterial
          color='orange'
          envMapIntensity={envMapIntensity}
        />
      </mesh>
    </>
  )
}
