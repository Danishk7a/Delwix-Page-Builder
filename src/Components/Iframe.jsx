import React, { useState, useCallback, useEffect, useRef } from 'react';

const IframeComponent = () => {
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const iframeContainerRef = useRef(null);

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
            background-color: #f0f0f0; 
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
          scene.add(torusKnot);

          let car;
          const loader = new GLTFLoader();
          loader.load('http://127.0.0.1:5500/public/scene.gltf', function (gltf) {
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
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(5, 10, 7.5);
          scene.add(directionalLight);

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
        </script>
      </body>
      </html>
    `;
  }, []);

  const handleCreateIframe = useCallback(() => {
    setShouldLoadScene(true);
  }, []);

  useEffect(() => {
    if (shouldLoadScene && iframeContainerRef.current) {
      const htmlContent = generateHtmlContent();
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;

      const iframe = document.createElement('iframe');
      iframe.src = dataUrl;
      iframe.style.width = '100%';
      iframe.style.height = '400px';
      iframe.style.border = 'none';
      iframe.title = '3D Scene';

      iframeContainerRef.current.appendChild(iframe);

      // Cleanup function
      return () => {
        if (iframeContainerRef.current) {
          iframeContainerRef.current.innerHTML = '';
        }
      };
    }
  }, [shouldLoadScene, generateHtmlContent]);

  return (
    <div>
      <button onClick={handleCreateIframe}>Add 3D Scene</button>
      <div ref={iframeContainerRef}></div>
    </div>
  );
};

export default IframeComponent;