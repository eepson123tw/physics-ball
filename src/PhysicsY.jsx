// @ts-nocheck
import {
  OrbitControls,
  RenderTexture,
  Text,
  PerspectiveCamera,
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight
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
import { useControls, button } from 'leva'
import Plane from './components/Plane'
import Dice from './components/dice'
import Text3DTransform from './components/Text3DTransform'

export default function PhysicsY() {
  const [active, setActive] = useState(0)
  const { planeColor } = useControls({
    planeColor: '#100f0f',
    ThrowDice: button(() => {
      let power = false
      function rollDice(count) {
        let num = Math.floor(Math.random() * 7 + 1)
        if (count < 20 || (power && count < 1)) {
          setActive(num)
          window.requestAnimationFrame(() => rollDice(count + 1))
        } else {
          setActive(num)
          setTimeout(() => {
            setActive(0)
          }, 5000)
        }
      }
      rollDice(0)
    }),
    screenshot: button(() => {
      const canvas = document.querySelector('canvas')
      canvas.toBlob(
        (blob) => {
          const imgurl = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = imgurl
          a.download = 'screenshot.jpeg'
          a.click()
        },
        'image/jpeg',
        0.8
      )
    })
  })

  const diceOne = useControls(
    'diceOne',
    {
      color: '#ff9621',
      text: 'Alex'
    },
    { collapsed: true }
  )
  const diceTwo = useControls(
    'diceTwo',
    {
      color: '#add8e6',
      text: 'Jiabo'
    },
    { collapsed: true }
  )
  const diceThree = useControls(
    'diceThree',
    {
      color: '#db2404',
      text: 'Phoebe'
    },
    { collapsed: true }
  )
  const diceFour = useControls(
    'diceFour',
    {
      color: '#00cbe5',
      text: 'Cari'
    },
    { collapsed: true }
  )
  const diceFive = useControls(
    'diceFive',
    {
      color: '#051eff',
      text: 'Eva'
    },
    { collapsed: true }
  )
  const diceSix = useControls(
    'diceSix',
    {
      color: '#1cb119',
      text: 'Nancy'
    },
    { collapsed: true }
  )
  const diceSeven = useControls(
    'diceSeven',
    {
      color: '#000000',
      text: 'Allen'
    },
    { collapsed: true }
  )

  return (
    <>
      <EffectComposer
        multisampling={4}
        mipmapBlur
        luminanceSmoothing={0.0}
        intensity={2}
      >
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
      </EffectComposer>
      <Text3DTransform active={active}></Text3DTransform>
      <Physics gravity={[0, -9.08, 0]}>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        {/* <Environment preset='night' background blur={1} /> */}
        <color attach='background' args={['#000']} />
        <group position={[0, -0.75, 0]}>
          <Center top>
            <Dice
              text={diceOne.text}
              color={diceOne.color}
              active={active === 1 ? true : false}
            />
            <Dice
              text={diceTwo.text}
              color={diceTwo.color}
              active={active === 2 ? true : false}
            />
            <Dice
              text={diceThree.text}
              color={diceThree.color}
              active={active === 3 ? true : false}
            />
            <Dice
              text={diceFour.text}
              color={diceFour.color}
              active={active === 4 ? true : false}
            />
            <Dice
              text={diceFive.text}
              color={diceFive.color}
              active={active === 5 ? true : false}
            />
            <Dice
              text={diceSix.text}
              color={diceSix.color}
              active={active === 6 ? true : false}
            />
            <Dice
              text={diceSeven.text}
              color={diceSeven.color}
              active={active === 7 ? true : false}
            />
            <Plane color={planeColor} />
          </Center>
          {/* <AccumulativeShadows>
            <RandomizedLight position={[2, 5, 5]} />
          </AccumulativeShadows> */}
        </group>
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
