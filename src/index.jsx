// @ts-nocheck
import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import PhysicsY from './PhysicsY.jsx'
import React from 'react'
const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <Canvas
    shadows
    gl={{
      antialias: false,
      preserveDrawingBuffer: true,
      alpha: true,
      autoClearColor: true
    }}
    camera={{
      fov: 45,
      position: [5, 5, 8]
    }}
  >
    <PhysicsY />
  </Canvas>
)
