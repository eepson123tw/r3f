// @ts-nocheck
import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useControls, button } from 'leva'
extend({ OrbitControls: OrbitControls })

export default function Cube({ scale = 2 }) {
  const { camera, gl } = useThree() // get Three instance
  const { position, color } = useControls('box', {
    position: {
      value: { x: -2, y: 0 },
      min: -4,
      max: 4,
      step: 0.01,
      joystick: 'invertY'
    },
    color: '#0f0',
    clickMe: button(() => {
      console.log(123123123123)
    }),
    choice: {
      options: ['a', 'z', 'c']
    }
  })
  const { scales } = useControls('sphere', {
    scales: 2
  })
  useFrame((state, delta) => {})
  return (
    <mesh
      position={[position.x, position.y, 0]}
      scale={scale}
      rotation-y={Math.PI * 0.25}
    >
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
