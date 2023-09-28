import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


let currentMount = null
// const TextureLoader = new THREE.TextureLoader()

//Scene & Camera
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    25,
    100 / 100,
    0.1,
    1000
)
camera.position.z = 15
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer()

//enviromentMap
const enviromentMap = new THREE.CubeTextureLoader()
const envMap = enviromentMap.load([
    './envMap/px.png',
    './envMap/nx.png',
    './envMap/py.png',
    './envMap/ny.png',
    './envMap/pz.png',
    './envMap/nz.png'
])
scene.environment = envMap
// scene.background = new THREE.Color(0x8633FF)
scene.background = envMap


//Controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target = new THREE.Vector3(3,3,3)
controls.enableDamping = true
// controls.autoRotate = true
// controls.autoRotateSpeed = 6

//Resize
const resize = () => { 
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    camera.aspect = currentMount.clientWidth / currentMount.clientHeight
    camera.updateProjectionMatrix()
}
window.addEventListener('resize', resize)

//Cube
const cubeTextureLoader = new THREE.TextureLoader()
const matcapTextureCube = cubeTextureLoader.load('./matcap/redMatcap.png')
const cubeMatcapMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextureCube
})
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    // new THREE.MeshBasicMaterial({color: 0xFF9033})
    cubeMatcapMaterial

)
scene.add(cube)
cube.position.set(0,0)

//Sphere
const sphereTextureLoader = new THREE.TextureLoader()
const sphereGeometry = new THREE.SphereGeometry(.5,32,32)
// const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xFF9033})
const matcapTextureSphere = sphereTextureLoader.load('./matcap/lemonGreenMatcap.png')
const sphereMatcapMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextureSphere
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMatcapMaterial)
scene.add(sphere)
sphere.position.set(0,2)

//TorusKnot
const torusKnotTextureLoader = new THREE.TextureLoader()
const torusGeometry = new THREE.TorusKnotGeometry(.2,.04, 100, 16)
const matcapTexture = torusKnotTextureLoader.load('./matcap/greenMatcap.png')
const torusMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
scene.add(torus)
torus.position.set(0,-2)
torus.scale.set(2,2,2)

//Render the scene
const animate = () => { 
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
 }

animate()

export const mountScene = (mountRef) => { 
currentMount = mountRef.current
resize()
currentMount.appendChild(renderer.domElement)
}

export const cleanUpScene = () => { 
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.dispose()
          child.geometry.dispose()
        }
      })
    currentMount.removeChild(renderer.domElement)
}