// @ts-nocheck
import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import {
  EffectComposer,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
  SSR
} from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { useControls } from 'leva'
import Drunk from './Drunk.jsx'

// import { BlendFunction } from 'postprocessing' <= not recommend

export default function PostProcessing() {
  const ssrProps = useControls('SSR Effect', {
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.5, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    blurSharpness: { value: 0.5, min: 0, max: 1 },
    rayStep: { value: 0.3, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    maxRoughness: { value: 0.1, min: 0, max: 1 },
    jitter: { value: 0.7, min: 0, max: 5 },
    jitterSpread: { value: 0.45, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    maxDepthDifference: { value: 3, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 }
  })
  const drunkProps = useControls('Drunk Effect', {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 }
  })
  const drunkRef = useRef()

  return (
    <>
      <color args={['#000']} attach='background' />
      {/* //多重採樣 */}
      <EffectComposer multisampling={4}>
        {/* <Vignette //暈影效果
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch //毛刺
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.02, 0.04]}
          mode={GlitchMode.CONSTANT_WILD}
        /> */}
        {/* 綻放效果 色域必須超出1 但three有限制不超過1 toneMapped  */}
        {/* <Noise blendFunction={BlendFunction.SOFT_LIGHT} premultiply /> */}
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
        {/* 景深效果 */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        {/* <SSR {...ssrProps} /> */}
        <Drunk
          {...drunkProps}
          ref={drunkRef}
          blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>

      <OrbitControls makeDefault />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color='white'
          emissive='orange'
          toneMapped={false}
          emissiveIntensity={1}
        />
      </mesh>

      <mesh castShadow position-y={2}>
        <sphereGeometry />
        <meshBasicMaterial color={[1.5 * 10, 1, 4 * 10]} toneMapped={false} />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color={[4, 1, 2]} toneMapped={false} />
      </mesh>

      <mesh castShadow position-y={2}>
        <sphereGeometry />
        <meshBasicMaterial color='orange' />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color='#000' metalness={0} roughness={0} />
      </mesh>
    </>
  )
}
