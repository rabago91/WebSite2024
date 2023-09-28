import {useRef, useEffect} from 'react'
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const FromBlender = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        const currentRef = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentRef;

        const scene = new THREE.Scene();
        // scene.background = new THREE.Color(0x8633FF);
        scene.background = new THREE.Color(0xF3BAD7);
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);
        scene.add(camera);

        // camera.position.z = 8;
        // camera.position.y = 7;
        camera.position.set(0,7,8)

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        //controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        //cube
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhongMaterial({color: 0xACFF33})
        const cube = new THREE.Mesh(geometry, material);
        //scene.add(cube);
        //camera.lookAt(cube.position);

        //3D Loader
        const gltfLoader = new GLTFLoader()
        gltfLoader.load('./donut3D/Donut.gltf',
        (gltf) => {
            gltf.scene.scale.multiplyScalar(4);
            gltf.scene.rotateZ(0)
            gltf.scene.rotateX(0)
            scene.add(gltf.scene)
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
        
        const clock = new THREE.Clock()
        const animate = () => {
            const elapsedTime = clock.getElapsedTime()
            cube.rotation.y = elapsedTime;
            cube.rotation.x = elapsedTime;

            cube.position.y = Math.sin(elapsedTime);

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        const resize = () => {
            // const updatedWidth = currentRef.clientWidth;
            // const updatedHeigth = currentRef.clientHeight;
            renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
            camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
            camera.updateProjectionMatrix();
        }

        window.addEventListener("resize", resize);

        animate();

        return () => {
            currentRef.removeChild(renderer.domElement);
            window.removeEventListener("resize", resize);
        };
    },[])

    return (
        <div ref={ mountRef} style = {{width: '100%', height: '100vh'}}>
        </div>
      )
    
}

export default FromBlender