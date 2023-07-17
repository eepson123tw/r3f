// @ts-nocheck
import { useThree, useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import {
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
          position={nodes.portalLight.position}
          geometry={nodes.portalLight.geometry}
          rotation={nodes.portalLight.rotation}
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
