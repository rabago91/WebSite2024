import {useRef, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { cleanUpScene, mountScene } from './Script'

const Scene = () => {
    const mountRef = useRef(null)

    useEffect(() => { 

        // Init Scene
        mountScene(mountRef)

        // Clean up scene
        return () => { 
           cleanUpScene()
         }
     }, [])

  return (
    <div
        className='Contenedor3D'
        ref = {mountRef}
        style={{width:'100%', height: '100vh'}}
    >
    </div>
  )
}

export default Scene
