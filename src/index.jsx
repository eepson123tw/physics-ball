// @ts-nocheck
import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import PhysicsX from './PhysicsX.jsx'
import React from 'react'
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <Canvas
    shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [4, 2, 6]
    }}
  >
    <PhysicsX />
  </Canvas>
)
