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
  InstancedRigidBodies,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
  RigidBody,
  Physics
} from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'

// colliders ball hull
export default function PhysicsX() {
  const cube = useRef()
  // const cubes = useRef()

  const twister = useRef()
  const [hitSound] = useState(() => new Audio('./hit.mp3'))

  const cubeJump = () => {
    const mass = cube.current.mass()
    cube.current.applyImpulse({ x: 0, y: 1, z: 0 })
    cube.current.applyTorqueImpulse({ x: 1, y: 1, z: 5 })
  }
  const collisionEnter = () => {
    hitSound.currentTime = 0
    hitSound.volume = 1
    hitSound.play()
  }
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    const eulerRotation = new THREE.Euler(0, time * 10, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    twister.current.setNextKinematicRotation(quaternionRotation)
    const angle = time * 0.5
    const x = Math.cos(angle) * 2
    const z = Math.sin(angle) * 2
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z })
  })

  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4()
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     )
  //     cubes.current.setMatrixAt(i, matrix)
  //   }
  // }, [])

  const cubesCount = 10
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
      <EffectComposer
        multisampling={4}
        mipmapBlur
        luminanceSmoothing={0.0}
        intensity={6}
      >
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
      </EffectComposer>
      <Physics debug gravity={[0, -9.08, 0]}>
        <Perf position='top-left' />
        <OrbitControls makeDefault />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <color attach='background' args={['#000']} />
        <RigidBody colliders='ball'>
          <mesh castShadow position={[0, 4, 0]} scale={0.25}>
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

        {/* <RigidBody colliders='ball' position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color='orange' />
          </mesh>
        </RigidBody> */}

        <RigidBody
          onClick={cubeJump}
          ref={cube}
          position={[1.5, 2, 0]}
          // onCollisionEnter={collisionEnter}
          // onCollisionExit={() => {
          //   console.log('exit')
          // }}
          // onSleep={() => {
          //   console.log('sleep')
          // }}
          // onWake={() => {
          //   console.log('wake')
          // }}
        >
          <CuboidCollider args={[1, 1, 1]} mass={0.5} />
          <mesh castShadow>
            <boxGeometry />
            <meshStandardMaterial color='mediumpurple' />
          </mesh>
        </RigidBody>
        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          type='kinematicPosition'
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color='red' />
          </mesh>
        </RigidBody>
        <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
          gravityScale={1}
          restitution={0}
          friction={0}
        >
          {/* <CuboidCollider args={[1, 1.5, 0.5]} />
          <CuboidCollider args={[1, 1, 1]} /> */}
          {/* <BallCollider args={[1.5]} /> */}
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color='mediumpurple' />
          </mesh>
        </RigidBody>

        <RigidBody type='fixed' restitution={0} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color='greenyellow' />
          </mesh>
        </RigidBody>
        <InstancedRigidBodies
          instances={instances}
          // onCollisionEnter={collisionEnter}
          // onCollisionExit={() => {
          //   console.log('exit')
          // }}
        >
          <instancedMesh
            castShadow
            receiveShadow
            args={[null, null, cubesCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color='tomato'>
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
                <Text fontSize={4} color={'#000'} letterSpacing={-0.1}>
                  hello
                </Text>
              </RenderTexture>
            </meshStandardMaterial>
          </instancedMesh>
        </InstancedRigidBodies>
        <RigidBody type='fixed'>
          <CuboidCollider args={[5, 20, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 20, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 20, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 20, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
      </Physics>
    </>
  )
}
