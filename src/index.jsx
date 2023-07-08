// @ts-nocheck
import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './component/Experience'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const setting = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
  zoom: 100
}

root.render(
  <Canvas
    orthographic
    gl={{
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      outputColorSpace: THREE.SRGBColorSpace
    }}
    flat
    camera={setting}
  >
    <Experience />
  </Canvas>
)
