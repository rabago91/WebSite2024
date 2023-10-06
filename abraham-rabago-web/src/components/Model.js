import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
// import { loadingContext } from "../App";
// import { useContext } from "react";

// const {setLoadState} = useContext(loadingContext);

let currentMount = null;
const gui = new dat.GUI();
gui.hide();

let useSetLoadValue = (val) => {};

var Donut;
const donutAux = {
  colors: {
    icing: 0xfb88b5,
    sprinkles1: 0x458de7,
    sprinkles2: 0xe752cd,
    sprinkles3: 0xe7d087,
    sprinkles4: 0x6d59e7,
  },
  url: "./donut3D/Donut2.gltf",
};
//Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 1000);
camera.position.set(0, 7, 8);
scene.add(camera);
camera.lookAt(0, 0, 0);

// -----------------------LOADER BAR LOGIC

const currentLoadProgress = {
  startedLoading: false,
  isLoaded: false,
  progressPercent: 0,
  totalEmenentsToLoad: 0,
  currentlyLoadingElementNumber: 0,
  currentlyLoadingElementName: "",
};

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function (url, item, total) {
  console.log(`Started loading: ${url}`);
  currentLoadProgress.startedLoading = true;
  //   currentLoadProgress.totalEmenentsToLoad = total;

  //   useSetLoadValue(currentLoadProgress);
};

loadingManager.onProgress = function (url, loaded, total) {
  console.log(`Currently loading file ${loaded}/${total} ${url}`);
  currentLoadProgress.progressPercent = (loaded / total) * 100;
  currentLoadProgress.currentlyLoadingElementNumber = loaded;
  currentLoadProgress.currentlyLoadingElementName = url;
  currentLoadProgress.totalEmenentsToLoad = total;

  //   useSetLoadValue(currentLoadProgress);
};

loadingManager.onLoad = function () {
  console.log(`Finished Loading`);
  currentLoadProgress.isLoaded = true;
  //   useSetLoadValue(currentLoadProgress);
  torus.material.dispose();
  torus.geometry.dispose();
  scene.remove(torus);
  // console.log('TORUUUUUUUUS', torus)
};

loadingManager.onError = function (url) {
  console.error(`Problem loading: ${url}`);
};

// Renderer
const renderer = new THREE.WebGLRenderer();

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true
// controls.autoRotateSpeed = 6

//Resize
const resize = () => {
  renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
  camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
  camera.updateProjectionMatrix();
  // console.log('threeScene', scene)
};
window.addEventListener("resize", resize);

// -----------------OBJECTS IN SCENE
scene.background = new THREE.Color(0xf3bad7);

// -------------TORUS
const geometry = new THREE.TorusGeometry(0.8, 0.25, 32, 100);
const material = new THREE.MeshStandardMaterial({
  color: donutAux.colors.icing,
  roughness: 0,
});
const torus = new THREE.Mesh(geometry, material);
// DonutLoaded.scale.multiplyScalar(4);
// torus.rotateZ(0);
torus.rotateX(THREE.MathUtils.degToRad(70));
scene.add(torus);

//3D Loader
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.load(
  donutAux.url,
  (gltf) => {
    let DonutLoaded = gltf.scene;
    DonutLoaded.scale.multiplyScalar(4);
    DonutLoaded.rotateZ(0);
    DonutLoaded.rotateX(0);
    scene.add(DonutLoaded);

    Donut = DonutLoaded;
  },
  () => {},
  () => {}
);

//----------------------GUIs

gui.addColor(donutAux.colors, "icing").onChange(() => {
  if (currentLoadProgress.isLoaded) {
    Donut.getObjectByName("Glaseado").material.color.set(donutAux.colors.icing);
  }
  torus.material.color.set(donutAux.colors.icing);
});
gui.addColor(donutAux.colors, "sprinkles1").onChange(() => {
  if (currentLoadProgress.isLoaded) {
    Donut.getObjectByName("Chispas1").material.color.set(
      donutAux.colors.sprinkles1
    );
  }
});
gui.addColor(donutAux.colors, "sprinkles2").onChange(() => {
  if (currentLoadProgress.isLoaded) {
    Donut.getObjectByName("Chispas2").material.color.set(
      donutAux.colors.sprinkles2
    );
  }
});
gui.addColor(donutAux.colors, "sprinkles3").onChange(() => {
  if (currentLoadProgress.isLoaded) {
    Donut.getObjectByName("Chispas3").material.color.set(
      donutAux.colors.sprinkles3
    );
  }
});
gui.addColor(donutAux.colors, "sprinkles4").onChange(() => {
  if (currentLoadProgress.isLoaded) {
    Donut.getObjectByName("Chispas4").material.color.set(
      donutAux.colors.sprinkles4
    );
  }
});

const shoulDisplayGui = (isCompletedAnimation) => {
  console.log(">>>>>>>shoulDisplayGui", isCompletedAnimation);
  if (isCompletedAnimation) {
    gui.show();
  } else {
    gui.hide();
  }
};

// Lights
const ambienatlight = new THREE.AmbientLight(0x404040, 50);
scene.add(ambienatlight);

const pointlight = new THREE.PointLight(0xffffff, 2);
scene.add(pointlight);
pointlight.position.set(0, 0.5, -2);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
dirLight1.position.set(0, 7, 8);
scene.add(dirLight1);

const clock = new THREE.Clock();

//Render the scene
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  if (Donut) Donut.rotation.y = -elapsedTime / 2;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

export const mountScene = (mountRef, isAnimationCompleted, setLoadValue) => {
  console.log("(3)~~~~~~Render:Model<---");
  currentMount = mountRef.current;
  useSetLoadValue = setLoadValue;
  setLoadValue(currentLoadProgress);
  resize();
  // shoulDisplayGui(false);
  shoulDisplayGui(isAnimationCompleted);
  currentMount.appendChild(renderer.domElement);
  // console.log('scene Children:', scene.children[4])
};

export const cleanUpScene = () => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.dispose();
      child.geometry.dispose();
    }
  });
  currentMount.removeChild(renderer.domElement);
};

// export const destroyGui = () => {
//     gui.destroy();
//  }
