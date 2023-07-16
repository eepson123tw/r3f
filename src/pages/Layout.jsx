// @ts-nocheck
import { Outlet, Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import { useLocation } from 'react-router-dom'
import { AppProvider, useApp } from '../store/app'

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
  },
  {
    path: '/portfolio',
    routerName: 'Portfolio'
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
  const [showNav, setShowNav] = useState(false)
  const canvasRef = useRef(false)
  const location = useLocation()
  const [{ windowWidth, routerName }, appDispatch] = useApp()

  useLayoutEffect(() => {
    appDispatch({
      type: 'init',
      windowWidth: window.innerWidth,
      routerName: location.pathname
    })
  }, [])
  useEffect(() => {
    if (location.pathname === '/portfolio') {
      setShowNav(false)
    } else {
      setShowNav(true)
    }
    return () => {
      setShowNav(false)
    }
  }, [location.pathname])

  return (
    <>
      <StrictMode>
        {showNav && (
          <nav>
            <ul>
              {routers.map((router, index) => (
                <li key={index}>
                  <Link to={router.path}>{router.routerName}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
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
