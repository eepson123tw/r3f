// @ts-nocheck
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
export default function Hamburger(props) {
  const { nodes, materials } = useGLTF('/modal/hamburger.glb')

  const { HamburgerTopBun } = useControls('hambuger', {
    HamburgerTopBun: { value: 3.77, min: 0, max: 10, step: 0.1 }
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.82, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        position={[0, HamburgerTopBun, 0]}
      />
    </group>
  )
}

useGLTF.preload('/modal/hamburger.glb')
