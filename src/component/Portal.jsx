// @ts-nocheck
import { useThree, useFrame, extend } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import {
  meshBounds,
  useGLTF,
  useTexture,
  OrbitControls,
  Center,
  Sparkles,
  shaderMaterial
} from '@react-three/drei'
import portalVertexShader from '/shaders/portal/vertex.glsl'
import portalFragmentShader from '/shaders/portal/fragment.glsl'
export default function Portal() {
  const { camera, gl } = useThree() // get Three instance
  const { nodes } = useGLTF('/portalModel/portal.glb')
  const bakedTexture = useTexture('/portalModel/baked.jpg')
  const PortalMaterial = shaderMaterial(
    {
      uTime: 0,
      uColorStart: new THREE.Color('#ffffff'),
      uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
  )
  extend({ PortalMaterial })
  const portalMaterial = useRef()
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta
  })

  // bakedTexture.flipY = false

  const eventHandler = (event) => {
    event.stopPropagation()
    console.log('---')
    console.log('distance', event.distance) // Distance between camera and hit point
    console.log('point', event.point) // Hit point coordinates (in 3D)
    console.log('uv', event.uv) // UV coordinates on the geometry (in 2D)
    console.log('object', event.object) // The object that triggered the event
    console.log('eventObject', event.eventObject) // The object that was listening to the event (useful where there is objects in objects)
    console.log('---')
    console.log('x', event.x) // 2D screen coordinates of the pointer
    console.log('y', event.y) // 2D screen coordinates of the pointer
    console.log('---')
    console.log('shiftKey', event.shiftKey) // If the SHIFT key was pressed
    console.log('ctrlKey', event.ctrlKey) // If the CTRL key was pressed
    console.log('metaKey', event.metaKey) // If the COMMAND key was pressed
    portalMaterial.current.uniforms.uColorEnd.value = new THREE.Color(
      `hsl(${Math.random() * 360},100%,75%)`
    )
    portalMaterial.current.uniforms.uColorStart.value = new THREE.Color(
      `hsl(${Math.random() * 360},100%,100%)`
    )
    portalMaterial.current.uTime = Math.random() * 8000
  }

  return (
    <>
      <color attach='background' args={['#030202']} />
      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial
            map={bakedTexture}
            map-flipY={false}
          ></meshBasicMaterial>
        </mesh>
        <mesh
          position={nodes.poleLightA.position}
          geometry={nodes.poleLightA.geometry}
        >
          <meshBasicMaterial color='#ffffe5'></meshBasicMaterial>
        </mesh>
        <mesh
          position={nodes.poleLightB.position}
          geometry={nodes.poleLightB.geometry}
        >
          <meshBasicMaterial color='#ffffe5'></meshBasicMaterial>
        </mesh>
        <mesh
          raycast={meshBounds}
          position={nodes.portalLight.position}
          geometry={nodes.portalLight.geometry}
          rotation={nodes.portalLight.rotation}
          onClick={eventHandler}
          onPointerEnter={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerLeave={() => {
            document.body.style.cursor = 'default'
          }}
        >
          <portalMaterial ref={portalMaterial} />
          {/* <meshBasicMaterial color='#ffffff'></meshBasicMaterial> */}
        </mesh>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={100}
        ></Sparkles>
      </Center>
    </>
  )
}
