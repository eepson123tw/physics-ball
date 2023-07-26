// @ts-nocheck

import React, { useRef } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { RenderTexture, Text, PerspectiveCamera } from '@react-three/drei'
export default function Dice(props) {
  const cube = useRef()
  const cubeJump = () => {
    // const mass = cube.current.mass()
    // cube.current.applyImpulse({ x: 0, y: 1, z: 0 })
    cube.current.applyTorqueImpulse({ x: 1, y: 1, z: 1 })
  }
  return (
    <>
      <RigidBody onClick={cubeJump} ref={cube} colliders='cuboid' mass={0.5}>
        <mesh
          castShadow
          position={[(Math.random() - 0.5) * 4, 4, (Math.random() - 0.5) * 4]}
          scale={0.5}
        >
          <boxGeometry />
          <meshStandardMaterial toneMapped={false}>
            <RenderTexture
              width={512}
              height={512}
              attach='map'
              anisotropy={16}
            >
              <PerspectiveCamera
                makeDefault
                manual
                aspect={1 / 1}
                position={[0, 0, 15]}
              />
              <color
                attach='background'
                args={
                  !props.active
                    ? [3 * Math.random(), 3 * Math.random(), 3 * Math.random()]
                    : [10, 10, 50]
                }
              />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <Text fontSize={3} color={props.color} letterSpacing={-0.1}>
                {props.active ? 'Wow! ' + props.text : props.text}
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </mesh>
      </RigidBody>
    </>
  )
}
