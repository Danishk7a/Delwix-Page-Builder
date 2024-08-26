import React, { useState, useCallback, useEffect, useRef } from 'react';

const IframeComponent = () => {
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const iframeContainerRef = useRef(null);
  const iframeRef = useRef(null);

  const generateHtmlContent = useCallback(() => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>3D Scene</title>
        <style>
          body { 
            margin: 0; 
            overflow: hidden;
          }
          canvas { 
            width: 100%; 
            height: 100%; 
            display: block; 
          }
        </style>
      </head>
      <body>
        <script type="importmap">
          {
            "imports": {
              "three": "https://unpkg.com/three@0.141.0/build/three.module.js",
              "three/examples/jsm/controls/OrbitControls": "https://unpkg.com/three@0.141.0/examples/jsm/controls/OrbitControls.js",
              "three/examples/jsm/loaders/GLTFLoader": "https://unpkg.com/three@0.141.0/examples/jsm/loaders/GLTFLoader.js"
            }
          }
        </script>

        <script type="module">
          import * as THREE from 'three';
          import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
          import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

          // Set up the scene
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0xffffff);

          // Set up the camera
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.z = 5;

          // Set up the renderer
          const renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(renderer.domElement);

          // Add OrbitControls
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;

          // Create a torus knot
          const geometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
          const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.5, roughness: 0.5 });
          const torusKnot = new THREE.Mesh(geometry, material);
       

          let car;
          const loader = new GLTFLoader();
          loader.load('http://localhost:5173/scene.gltf', function (gltf) {
              car = gltf.scene;

              // Center the car
              const box = new THREE.Box3().setFromObject(car);
              const center = box.getCenter(new THREE.Vector3());
              car.position.sub(center);
              scene.add(car);
              console.log(car);

              animate();
          });

          // Add lights
          const ambientLight = new THREE.AmbientLight(0xffffff, 7);
          scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight.position.set(0, 10, 0);
          scene.add(directionalLight);
          directionalLight.castShadow = true;

          const directionalLight2 = new THREE.DirectionalLight(0xff0000, 2);
          directionalLight2.position.set(5, 2, 0);
          scene.add(directionalLight2);
          directionalLight2.castShadow = true;

          
          const directionalLight3 = new THREE.DirectionalLight(0x0000ff, 2);
          directionalLight3.position.set(-5, 2, 0);
          scene.add(directionalLight3);
          directionalLight3.castShadow = true;

         



 const gridHelper = new THREE.GridHelper(10, 10);

        // scene.add(gridHelper);

          // Animation loop
          function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          }

          animate();

          // Handle window resize
          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          window.addEventListener('resize', onWindowResize);

          // Handle messages from parent

          window.addEventListener('message', function(event) {
            if (event.data.type === 'changeBackgroundColor') {
              scene.background = new THREE.Color(event.data.color);
            } else if (event.data.type === 'changeLightIntensity') {
              // ambientLight.intensity = event.data.intensity;
              directionalLight.intensity = event.data.intensity;
            }else if(event.data.type === 'ChangeModel'){
            const loader = new GLTFLoader();
          loader.load(event.data.model, function (gltf) {
              car = gltf.scene;

              // Center the car
              const box = new THREE.Box3().setFromObject(car);
              const center = box.getCenter(new THREE.Vector3());
              car.position.sub(center);
              scene.add(car);
              console.log(car);

              animate();
          });
            
            }
          });

        </script>
      </body>
      </html>
    `;
  }, []);

  const handleCreateIframe = useCallback(() => {
    setShouldLoadScene(true);
  }, []);

  const changeBackgroundColor = useCallback((color) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ type: 'changeBackgroundColor', color }, '*');
    }
  }, []);

  const changeLightIntensity = useCallback((intensity) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ type: 'changeLightIntensity', intensity }, '*');
    }
  }, []);

  const ChangeModel = useCallback((model) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ type: 'ChangeModel', model }, '*');
    }
  }, []);

  useEffect(() => {
    if (shouldLoadScene ) {
      const htmlContent = generateHtmlContent();
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;

      const iframe = document.createElement('iframe');
      iframe.src = dataUrl;
      iframe.style.width = '100%';
      iframe.style.height = '400px';
      iframe.style.border = 'none';
      iframe.title = '3D Scene';
      
      const Box = document.getElementById('test')

      Box.appendChild(iframe);
      iframeRef.current = iframe;

      // Cleanup function
      return () => {
        if (Box) {
          Box.innerHTML = '';
        }
        iframeRef.current = null;
      };
    }
  }, [shouldLoadScene, generateHtmlContent]);










  return (
    <div>
      <button onClick={handleCreateIframe}>Add 3D Scene</button>
      <div>
      
        <input type="color" onChange={(e)=>{changeBackgroundColor(e.target.value)  }} />
      </div>
      <div>
     
        <input type="range" defaultValue={7} min={0} max={30} step={0.5} onChange={(e)=>{changeLightIntensity(e.target.value)}} />
        <input type="text" onChange={(e)=>{ ChangeModel(e.target.value)}} />
      </div>
      <div id='test'></div>
    </div>
  );
};

export default IframeComponent;