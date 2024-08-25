import React, { useState, useCallback, useEffect, useRef } from 'react';
import IframeComponent from './Iframe';




const Content = ({addDiv,currentSelectedDiv , setuniqueID,uniqueID, SelectDiv}) => {



  const  deleteDiv= () =>{
    const div = document.getElementById(currentSelectedDiv);
    console.log("DELETED ")
     
       if (div) {
         div.remove();
         
       } else {
         console.log(`Element with ID ${div} not found`);
       }
  }

  const leftHorizontolly = ()=>{
    const div = document.getElementById(currentSelectedDiv);
    div.style.display = 'flex';
    div.style.justifyContent = 'start' 

 }

 const CenterHorizontolly = ()=>{
    const div = document.getElementById(currentSelectedDiv);
    div.style.display = 'flex';
    div.style.justifyContent = 'center' 

 }

 const RightHorizontolly = ()=>{
    const div = document.getElementById(currentSelectedDiv);
    div.style.display = 'flex';
    div.style.justifyContent = 'end' 

 }

 const heightChange = (e)=>{
    const div = document.getElementById(currentSelectedDiv);
    div.style.height =`${e.target.value}vh`;

 }

 const widthChange = (e)=>{
    const div = document.getElementById(currentSelectedDiv);
    div.style.width =`${e.target.value}%`;
    
 }


 const Top = ()=>{
   const div = document.getElementById(currentSelectedDiv);
  div.style.display ="flex" 
   div.style.alignItems ="start";
   
}

const Middle = ()=>{
   const div = document.getElementById(currentSelectedDiv);
   div.style.display ="flex" 
   div.style.alignItems = "center";
   
}

const Bottom = ()=>{
   const div = document.getElementById(currentSelectedDiv);
   div.style.display ="flex" 
   div.style.alignItems = "end";
   
}

const paddingHandle = (e)=>{
   const div = document.getElementById(currentSelectedDiv);
   div.style.padding = `${e.target.value}px`;


}

const Gap =(e)=>{
  const div = document.getElementById(currentSelectedDiv);
  div.style.display= 'flex';
  div.style.gap = `${e.target.value}px`


}

const FlexDirectionColumn =()=>{
  const div = document.getElementById(currentSelectedDiv); 
  div.style.flexDirection = 'column'
}
const FlexDirectionRow =()=>{
  const div = document.getElementById(currentSelectedDiv); 
  div.style.flexDirection = 'row'
}
const imgHandle = (e) => {
   const div = document.getElementById(currentSelectedDiv);
   const img = document.createElement('img');


   img.id = `img-${uniqueID}`
   setuniqueID((pre)=> pre +1);
   img.className = 'clickable-div';
   img.onclick = SelectDiv;
   img.style.height = '200px';
 
   const file = e.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onload = (event) => {
       img.src = event.target.result; // Set the src attribute to the file content
       div.appendChild(img); // Append the img to the selected div after setting src
     };
     reader.readAsDataURL(file); // Read the file as a data URL
   }
 };

 const addText =()=>{
   const div = document.getElementById(currentSelectedDiv);
  let v = document.getElementById('addtxt').value
 
  const textBox =  document.createElement('div');
  textBox.id = `div-${uniqueID}`
  setuniqueID((pre)=> pre +1);
  textBox.className = 'clickable-div';
  textBox.onclick = SelectDiv
  textBox.textContent= v;
  
  div.append(textBox)


 }

 const fontSize = (e)=>{
  console.log("Font SIze :", e.target.value);
  const div = document.getElementById(currentSelectedDiv);
  div.style.fontSize = `${e.target.value}px`;



}
const Opacity = (e)=>{
  const div = document.getElementById(currentSelectedDiv);
  const opacityValue = e.target.value / 100; // Assuming the input range is 0-100
  div.style.opacity = opacityValue;


}

const BoxShadow = (e)=>{

  const div = document.getElementById(currentSelectedDiv);
  const opacityValue = e.target.value / 100; // Assuming the input range is 0-100
  // div.style.boxShadow = `1px 1px ${e.target.value}px black`;
  div.style.filter = `drop-shadow(30px 10px ${e.target.value}px #242424)`;
 

}


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
  if (shouldLoadScene) {
    const htmlContent = generateHtmlContent();
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;

    const iframe = document.createElement('iframe');
    iframe.src = dataUrl;
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = 'none';
    iframe.title = '3D Scene';

    document.getElementById(currentSelectedDiv).appendChild(iframe);

    // Cleanup function
    return () => {
      if (iframeContainerRef.current) {
        iframeContainerRef.current.innerHTML = '';
      }
    };
  }
}, [shouldLoadScene, generateHtmlContent]);

  return (
   <>
   <div style={{display:'flex', flexDirection:'column', gap:'20px', justifyContent:'center'}}>
   
        <button onClick={addDiv}>AddDIV</button>
        <button onClick={deleteDiv}>Delete DIV</button>
        <button onClick={handleCreateIframe}>Add 3D</button>
        {/* <IframeComponent /> */}

        <div style={{display:'flex', gap:'10px', alignItems:'center'}}> <span onClick={leftHorizontolly}>Left</span>  <span onClick={CenterHorizontolly}>Center</span> <span onClick={RightHorizontolly}>right</span></div>
 

<div>Height :  <input type="range" min="0" max="100"  className="slider" onChange={heightChange} /></div>
<div>Width :  <input type="range" min="0" max="100"  className="slider" onChange={widthChange} />
</div>

<div>Padding :  <input type="range" min="0" max="100"  className="slider" onChange={paddingHandle} /></div>


<div>Gap :  <input type="range" min="0" max="100"  className="slider" onChange={Gap} /></div>

<div style={{display:'flex', gap:'20px'}}><button onClick={FlexDirectionColumn}>Change To Column</button>
<button onClick={FlexDirectionRow}>Change To Row</button></div>

 <div style={{display:'flex', gap:'10px', alignItems:'center'}}> <span onClick={Top}>Top</span>  <span onClick={Middle}>Middle</span> <span onClick=
    {Bottom}>Bottom</span></div>

<div>Add Text : <input id='addtxt' type="text"  /> <button onClick={addText}>Add</button></div>
<div>Font Size :  <input type="range" min="0" max="100"  className="slider" onChange={fontSize} /></div>


<div style={{display:'flex', gap:'20px'}} >Add Image : <input type="file" onChange={imgHandle} /></div>
<div>Opacity :  <input type="range" min="0" max="100"  className="slider" onChange={Opacity} /></div>
<div>Box Shadow :  <input type="range" min="0" max="100"  className="slider" onChange={BoxShadow} /></div>

    
   </div>
   </>
  )
}

export default Content