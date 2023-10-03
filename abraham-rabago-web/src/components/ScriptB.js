import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'


let currentMount = null

//Scene & Camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    25,
    100 / 100,
    0.1,
    1000
)
camera.position.set(0,7,8)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer()

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
// controls.autoRotate = true
// controls.autoRotateSpeed = 6

//Resize
const resize = () => { 
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    camera.aspect = currentMount.clientWidth / currentMount.clientHeight
    camera.updateProjectionMatrix()
    console.log('threeScene', scene)
}
window.addEventListener('resize', resize)

// -----------------OBJECTS IN SCENE
scene.background = new THREE.Color(0xF3BAD7);

//3D Loader
const gltfLoader = new GLTFLoader()
gltfLoader.load('./donut3D/Donut2.gltf',
(gltf) => {
    const DonutModel =  gltf.scene;
    DonutModel.scale.multiplyScalar(4);
    DonutModel.rotateZ(0)
    DonutModel.rotateX(0)
    DonutModel.getObjectByName('Glaseado').material.color.setHex(0x00FF00)
    scene.add(DonutModel)
},
() => {  },
() => {  }
)


camera.lookAt(0,0,0);


// Lights
const ambienatlight = new THREE.AmbientLight(0x404040, 50);
scene.add(ambienatlight);

const pointlight = new THREE.PointLight(0xffffff, 2);
scene.add(pointlight);
pointlight.position.set(0, 0.5, -2);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1)
dirLight1.position.set(0,7,8)
scene.add(dirLight1)



//Render the scene
const animate = () => { 
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
 }

animate()

export const mountSceneB = (mountRef) => { 
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