// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import React from 'react'
import { useGLTF, Clone } from '@react-three/drei'

export default function SupModal() {
  // const model = useLoader(GLTFLoader, '/modal/hamburger.glb')
  const flightModel = useGLTF('/modal/FlightHelmet/glTF/FlightHelmet.gltf')

  return (
    <>
      <Clone object={flightModel.scene} scale={0.35} position-x={-4}></Clone>
      <Clone object={flightModel.scene} scale={0.5} position-x={0}></Clone>
      <Clone object={flightModel.scene} scale={1} position-x={4}></Clone>
    </>
  )
}

useGLTF.preload('/modal/FlightHelmet/glTF/FlightHelmet.gltf')
