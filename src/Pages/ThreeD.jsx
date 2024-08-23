import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeD = () => {
  useEffect(() => {
    // Function to initialize the scene
    const addScene = () => {
      const scene = new THREE.Scene();
      const canva = document.getElementById('canvas');

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, canva.clientWidth / canva.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(canva.clientWidth, canva.clientHeight);
      canva.appendChild(renderer.domElement);

      // Cube geometry
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Animation function
      function animate() {
        requestAnimationFrame(animate);
        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      // Start animation
      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = canva.clientWidth / canva.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canva.clientWidth, canva.clientHeight);
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Call once to set initial size

      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    };

    // Initialize the scene
    addScene();

    // Cleanup on unmount
    return () => {
      const canva = document.getElementById('canvas');
      if (canva && canva.firstChild) {
        canva.removeChild(canva.firstChild);
      }
    };
  }, []);

  return (
    <>
      <div style={{ position: 'relative', display: 'flex' }}>
        <div style={{ height: '100vh', width: '20%', backgroundColor: '#242424' }}>
          <button onClick={() => {}}>Create Scene</button>
        </div>
        <canvas id='canvas' style={{ width: '80%', height: '100vh', backgroundColor: 'black' }} />
      </div>
    </>
  );
};

export default ThreeD;
