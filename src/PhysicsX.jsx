// @ts-nocheck
import {
  OrbitControls,
  RenderTexture,
  Text,
  PerspectiveCamera
} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import React from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import {
  CuboidCollider,
  BallCollider,
  RigidBody,
  Physics
} from '@react-three/rapier'

import { useRef } from 'react'

// colliders ball hull
export default function PhysicsX() {
  const cube = useRef()
  const cubeJump = () => {
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 })
  }

  return (
    <>
      <EffectComposer
        multisampling={4}
        mipmapBlur
        luminanceSmoothing={0.0}
        intensity={6}
      >
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
      </EffectComposer>
      <Physics debug>
        <Perf position='top-left' />
        <OrbitControls makeDefault />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <color attach='background' args={['#000']} />
        <RigidBody colliders='ball' type='fixed'>
          <mesh castShadow position={[0, 4, 0]}>
            <sphereGeometry />
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
                <color attach='background' args={[10, 10, 10]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} />
                <Text fontSize={1} color={'#000'} letterSpacing={-0.1}>
                  hello
                </Text>
              </RenderTexture>
            </meshStandardMaterial>
          </mesh>
        </RigidBody>

        <RigidBody colliders='ball' position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color='orange' />
          </mesh>
        </RigidBody>

        <RigidBody onClick={cubeJump} ref={cube} position={[1.5, 2, 0]}>
          <mesh castShadow>
            <boxGeometry />
            <meshStandardMaterial color='mediumpurple' />
          </mesh>
        </RigidBody>

        <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          {/* <CuboidCollider args={[1, 1.5, 0.5]} />
          <CuboidCollider args={[1, 1, 1]} /> */}
          <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color='mediumpurple' />
          </mesh>
        </RigidBody>

        <RigidBody type='fixed'>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color='greenyellow' />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  )
}
