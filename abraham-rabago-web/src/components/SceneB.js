import {useRef, useEffect} from 'react'
// import * as THREE from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { cleanUpScene, mountSceneB } from './ScriptB'

const SceneB = () => {
    const mountRef = useRef(null)

    useEffect(() => { 

        // Init Scene
        mountSceneB(mountRef)

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

export default SceneB
