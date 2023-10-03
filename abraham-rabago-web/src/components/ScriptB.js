import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'


let currentMount = null;
const gui = new dat.GUI()
var Donut;
const donutAux = {
    colors: {
        Glaseado: 0xFB88B5,
        Chispas1: 0x458DE7,
        Chispas2: 0xE752CD,
        Chispas3: 0xE7D087,
        Chispas4: 0x6D59E7
    },
    url: './donut3D/Donut2.gltf'
}
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
camera.lookAt(0,0,0);

// -----------------------LOADER BAR LOGIC
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function(url, item, total) {
    console.log(`Started loading: ${url}`);
}

loadingManager.onProgress = function(url, loaded, total) {
    console.log(`Currently loading file ${loaded}/${total} ${url}`);
}

loadingManager.onLoad = function() {
    console.log(`Finished Loading`);
}

loadingManager.onError = function(url) {
    console.error(`Problem loading: ${url}`);
}

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
    // console.log('threeScene', scene)
}
window.addEventListener('resize', resize)

// -----------------OBJECTS IN SCENE
scene.background = new THREE.Color(0xF3BAD7);

//3D Loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.load(donutAux.url,
(gltf) => {
    let DonutLoaded =  gltf.scene;
    DonutLoaded.scale.multiplyScalar(4);
    DonutLoaded.rotateZ(0)
    DonutLoaded.rotateX(0)
    // DonutModel.getObjectByName('Glaseado').material.color.setHex(0xFF0FF0)
    scene.add(DonutLoaded)

    Donut = DonutLoaded;
},
() => {  },
() => {  }
)




//----------------------GUIs

gui.addColor(donutAux.colors, "Glaseado" )
    .onChange(() => { 
        Donut.getObjectByName('Glaseado').material.color.set(donutAux.colors.Glaseado)
 })
 gui.addColor(donutAux.colors, "Chispas1" )
    .onChange(() => { 
        Donut.getObjectByName('Chispas1').material.color.set(donutAux.colors.Chispas1)
 })
 gui.addColor(donutAux.colors, "Chispas2" )
 .onChange(() => { 
     Donut.getObjectByName('Chispas2').material.color.set(donutAux.colors.Chispas2)
})
gui.addColor(donutAux.colors, "Chispas3" )
.onChange(() => { 
    Donut.getObjectByName('Chispas3').material.color.set(donutAux.colors.Chispas3)
})
gui.addColor(donutAux.colors, "Chispas4" )
.onChange(() => { 
    Donut.getObjectByName('Chispas4').material.color.set(donutAux.colors.Chispas4)
})


// Lights
const ambienatlight = new THREE.AmbientLight(0x404040, 50);
scene.add(ambienatlight);

const pointlight = new THREE.PointLight(0xffffff, 2);
scene.add(pointlight);
pointlight.position.set(0, 0.5, -2);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1)
dirLight1.position.set(0,7,8)
scene.add(dirLight1)



const clock = new THREE.Clock()

//Render the scene
const animate = () => { 
    const elapsedTime = clock.getElapsedTime()
    if (Donut) Donut.rotation.y = -elapsedTime/2
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
 }

animate()

export const mountSceneB = (mountRef) => { 
currentMount = mountRef.current
resize()
currentMount.appendChild(renderer.domElement)
// console.log('scene Children:', scene.children[4])
}

export const cleanUpScene = () => { 
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.dispose()
          child.geometry.dispose()
        }
      })
    //   gui.destroy();
    currentMount.removeChild(renderer.domElement)
}