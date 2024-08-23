<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js 3D Scene with Grid</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.150.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.150.0/examples/jsm/"
            }
        }
    </script>

    <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

        // Setup scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf2f2f2);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

        // Adjust camera position
        camera.position.set(0, 5, 10);

        // Add grid helper
        const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
        scene.add(gridHelper);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 7);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        const light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    scene.add(light3);

    const light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 0);
    scene.add(light4);

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        // Load car model
        let car;
        const loader = new GLTFLoader();
        loader.load('scene.gltf', function (gltf) {
            car = gltf.scene;
            
            // Center the car
            const box = new THREE.Box3().setFromObject(car);
            const center = box.getCenter(new THREE.Vector3());
            car.position.sub(center);
            
            // Scale the car if needed
            // car.scale.set(0.1, 0.1, 0.1);  // Adjust these values as needed

            // Remove the black floor if it exists
            car.traverse((child) => {
                if (child.isMesh && child.name.toLowerCase().includes('floor')) {
                    child.visible = false;
                }
            });

            scene.add(car);
            animate();
        });

        // Animate
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        // Handle window resizing
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    </script>
</body>
</html>