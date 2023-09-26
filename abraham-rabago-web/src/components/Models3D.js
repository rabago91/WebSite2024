import {useRef, useEffect} from 'react'
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Models3D = () => {
    const mountRef = useRef(null)

    useEffect(()=>{
        const currentRef = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentRef;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x8633FF);
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);
        scene.add(camera);

        camera.position.z = 6;
        camera.position.x = 7;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhongMaterial({color: 0xACFF33})
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.lookAt(cube.position);

        const ambienatlight = new THREE.AmbientLight(0x404040, 10);
        scene.add(ambienatlight);
        
        const pointlight = new THREE.PointLight(0xff000, 300);
        pointlight.position.set(8, 8, 8);
        scene.add(pointlight);
        
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
            const updatedWidth = currentRef.clientWidth;
            const updatedHeigth = currentRef.clientHeight;
            renderer.setSize(updatedWidth, updatedHeigth);
            camera.aspect = updatedWidth / updatedHeigth;
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

export default Models3D