// @ts-nocheck
import { Outlet, Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'

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
  },
  {
    path: '/env',
    routerName: 'Env'
  },
  {
    path: '/envMap',
    routerName: 'EnvMap'
  },
  {
    path: '/modal',
    routerName: 'Modal'
  },
  {
    path: '/threeDText',
    routerName: 'ThreeDText'
  }
]
const setting = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
  zoom: 100
}

const Layout = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  const canvasRef = useRef(false)
  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

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
      <StrictMode>
        <Leva collapsed={true} />
        <Canvas
          ref={canvasRef}
          shadows={false}
          orthographic
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpaces
          }}
          flat
          camera={setting}
        >
          {windowWidth >= 600 && <Perf position='top-left' />}
          {/* <color args={['#fff']} attach='background' /> */}
          <Outlet />
        </Canvas>
      </StrictMode>
    </>
  )
}

export default Layout
