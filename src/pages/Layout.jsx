// @ts-nocheck
import { Outlet, Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const setting = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
  zoom: 100
}
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Index</Link>
          </li>
          <li>
            <Link to='/deri'>Deri</Link>
          </li>
        </ul>
      </nav>
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
        <Outlet />
      </Canvas>
    </>
  )
}

export default Layout
