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

const routers = [
  {
    path: '/',
    routerName: 'Index'
  },
  {
    path: '/deri',
    routerName: 'Deri'
  },
  {
    path: '/debug',
    routerName: 'Debug'
  }
]

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          {routers.map((router, index) => (
            <li key={index}>
              <Link to={router.path}>{router.routerName}</Link>
            </li>
          ))}
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
