import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ThreeMenu from './ThreeMenu';

const ThreeScene = () => {
  const [changeModel, setchangeModel] = useState('./scene3.gltf')
  const [canvasColor, setcanvasColor] = useState(0x242424)
  const [lightIntensity, setlightIntensity] = useState(3)

  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    // Setup scene
    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(canvasColor);
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    // Adjust camera position
    cameraRef.current.position.set(-4, 2, 1);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, lightIntensity);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 7);
    directionalLight.position.set(5, 10, 7.5);
    sceneRef.current.add(directionalLight);

    const light3 = new THREE.PointLight(0x5b10b4, 10);
    light3.position.set(0, 100, -500);
    sceneRef.current.add(light3);

    const light4 = new THREE.PointLight(0xe64874, 10);
    light4.position.set(-500, 300, 0);
    sceneRef.current.add(light4);

    // Setup renderer
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(rendererRef.current.domElement);

    // Add orbit controls
    const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controls.update();

    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    sceneRef.current.add(gridHelper);

    // Handle window resizing
    function handleResize() {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    // Animate
    function animate() {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        // modelRef.current.rotation.y += 0.01;
      }
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(rendererRef.current.domElement);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    // Update background color
    sceneRef.current.background = new THREE.Color(canvasColor);

    // Update light intensity
    // sceneRef.current.children.forEach(child => {
    //   if (child instanceof THREE.AmbientLight) {
    //     child.intensity = lightIntensity;
    //   }
    // });

    // Load new model
    const loader = new GLTFLoader();
    loader.load(
      changeModel,
      function (gltf) {
        // Remove existing model if any
        if (modelRef.current) sceneRef.current.remove(modelRef.current);

        const newModel = gltf.scene;
        
        // Center the new model
        const box = new THREE.Box3().setFromObject(newModel);
        const center = box.getCenter(new THREE.Vector3());
        newModel.position.sub(center);

        // Remove the black floor if it exists
        newModel.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes('floor')) {
            child.visible = false;
          }
        });
        
        sceneRef.current.add(newModel);
        modelRef.current = newModel;
      },
      undefined,
      function (error) {
        console.error('An error happened', error);
      }
    );

  }, [changeModel, canvasColor, lightIntensity]);

  return (
    <div style={{display:'flex'}} >
      <div id='menu' style={{display:'flex', flexDirection:'column', gap:'',width:"30%", border:'1px solid grey',height:'100vh', overflowY:'scroll'}}>
        <ThreeMenu setcanvasColor={setcanvasColor} setchangeModel={setchangeModel} setlightIntensity={setlightIntensity}/>
      </div>
      <div ref={mountRef} style={{ width: '77%', height: '100vh' }} />
    </div>
  );
};

export default ThreeScene;