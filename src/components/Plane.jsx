// @ts-nocheck

import React from 'react'
import { RigidBody } from '@react-three/rapier'
export default function Plane(props) {
  return (
    <>
      <RigidBody type='fixed' restitution={0} friction={0.7}>
        <mesh receiveShadow position-y={-1.25}>
          <boxGeometry args={[10, 0.1, 10]} />
          <meshStandardMaterial color={props.color} />
        </mesh>
      </RigidBody>
    </>
  )
}
