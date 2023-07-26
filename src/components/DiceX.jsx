// @ts-nocheck

import React, { useRef, useMemo } from 'react'
import { RigidBody, InstancedRigidBodies } from '@react-three/rapier'
import { RenderTexture, Text, PerspectiveCamera } from '@react-three/drei'
export default function DiceX(props) {
  const cube = useRef()
  const cubeJump = () => {
    // const mass = cube.current.mass()
    // cube.current.applyImpulse({ x: 0, y: 1, z: 0 })
    cube.current.applyTorqueImpulse({ x: 1, y: 1, z: 1 })
  }
  const cubesCount = 125
  const instances = useMemo(() => {
    const instances = []
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: 'instance_' + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8
        ],
        rotation: [Math.random(), Math.random(), Math.random()]
      })
    }
    return instances
  }, [])
  return (
    <>
      <InstancedRigidBodies
        instances={instances}
        onClick={cubeJump}
        ref={cube}
        colliders='cuboid'
        scale={0.3}
      >
        <instancedMesh castShadow receiveShadow args={[null, null, cubesCount]}>
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
                    ? [1 * Math.random(), 2 * Math.random(), 3 * Math.random()]
                    : [1, 1, 1]
                }
              />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <Text fontSize={3} color={props.color} letterSpacing={-0.1}>
                {props.active ? 'Wow! ' + props.text : props.text}
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </instancedMesh>
      </InstancedRigidBodies>
    </>
  )
}
