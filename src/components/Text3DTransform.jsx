// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export default function Text3DTransform({
  children,
  config,
  font = '/inter.json',
  ...props
}) {
  const texture = useLoader(
    RGBELoader,
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr'
  )
  const list = ['Alex', 'Jiabo', 'Phoebe', 'Cari', 'Eva', 'Nancy', 'Allen']
  const getText = (active) =>
    active ? `Let ${list[active - 1]} buy lunch!` : ''
  const [showWinner, setShowWinner] = useState(false)
  useEffect(() => {
    let x = setTimeout(() => {
      props.active && setShowWinner(true)
      !props.active && setShowWinner(false)
    }, 1000)
    return () => {
      // setShowWinner(false)
      clearTimeout(x)
    }
  }, [props.active])

  return (
    <>
      <Environment near={1} far={1000} resolution={10}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer
            form='rect'
            intensity={20}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            form='rect'
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[20, 2, 1]}
          />
          <Lightformer
            type='ring'
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-0.1, -1, -5]}
            scale={10}
          />
        </group>
      </Environment>

      {/* <Center scale={[0.8, 1, 1]} front> */}
      <Text3D
        position={[-2, 1, 0]}
        castShadow
        bevelEnabled
        scale={0.5}
        font={font}
        letterSpacing={-0.03}
        height={0.25}
        bevelSize={0.01}
        bevelSegments={10}
        curveSegments={128}
        bevelThickness={0.01}
      >
        {showWinner ? getText(props.active) : 'Who treats ?'}
        <MeshTransmissionMaterial background={texture} />
      </Text3D>
      {/* </Center> */}
    </>
  )
}
