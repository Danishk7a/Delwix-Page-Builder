import React, { createElement, useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Userpanel from './Pages/Userpanel'
import ThreeD from './Pages/ThreeD'
import './App.css'
import Style from './Components/Style'
import Content from './Components/Content'
import Advance from './Components/Advance'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ThreeD from './Pages/ThreeD'
import ThreeScene from './Components/ThreeD/ThreeScene'


import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)

  const borderThreshold = 10; 
  const [cursor, setcursor] = useState(0)
      const handleMouseMove = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;
  
        // Check if the mouse is inside the div
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          // Check if the mouse is within the border threshold
          const isOnBorder = (
            x < rect.left + borderThreshold || x > rect.right - borderThreshold ||
            y < rect.top + borderThreshold || y > rect.bottom - borderThreshold
          );
  
          if (isOnBorder) {
            console.log("on border");
            setcursor(1)
          } else {
            console.log("inside");
            setcursor(0)
            setcolor("purple")
          }
        }
      };
  const [currentSelectedDiv, setcurrentSelectedDiv] = useState("body")
  const [SelectedElementIs, setSelectedElementIs] = useState(null);
      const SelectDiv = (e)=>{
     
      if(!e.target.classList.contains('non_selectables')){
        setcurrentSelectedDiv(e.target.id)
        console.log(e.target.id);
        document.querySelectorAll('.clickable-div').forEach(div => {
           div.classList.remove('selected');
           div.classList.remove('resizable');
          // const handle =  document.querySelector('.handle')
          //  div.removeChild(handle)
         });
   
         
         e.target.classList.add('selected');
        
        //  if(e.target.parentElement.id !== 'body'){
          e.target.classList.add('resizable');
        //  }
             
         
         
        
    
         setSelectedElementIs(e.target.tagName)
  
      }
      if(e.target.id === 'THREE'){
        setSelectedElementIs('Canvas')

      }

    
      
     }
  
      const [uniqueID, setuniqueID] = useState(0)
      const addDiv = ()=>{
  
            const div = document.createElement('div');
            const parent =   document.getElementById(currentSelectedDiv);
               div.id = `div-${uniqueID}`
          
               setuniqueID((pre)=> pre +1);
              //  console.log(uniqueID)
              console.log("This is parent BG : ", parent.style.backgroundColor)

  
      
        div.className = 'clickable-div';
        // const handle =  document.createElement('div')
        // handle.className = 'handle'

        // div.appendChild(handle)
       
          div.style.width = '100%' ;
          div.style.height = '4vh';
          div.style.backgroundColor = parent.style.backgroundColor === 'rgb(91, 16, 180)' ? '#9237ff':'#5b10b4';
          div.style.color = '#f2f2f2';
          div.style.position = 'relative';
          div.onclick = SelectDiv
          div.style.display = 'flex';
          div.style.justifyContent= 'center'
          div.style.alignItems = 'center'
          div.style.gap = '10px'
        //   div.style.border = '2px solid darkblue';
          div.style.overflow = "hidden"
          div.style.padding = "20px"
          // div.style.cursor = cursor ? "pointer":"arrow"
          // div.onclick = handleClick;
          // div.addEventListener('mousemove', handleMouseMove);
          
          // div.appendChild(width_div)
          // div.appendChild(height_div)
          // parent.style.height = `100vh`
          // parent.style.height = window.innerWidth
        parent.appendChild(div);
           
  
          if(div.id === 'div-0'){
            div.click();
          }
  
  
          
          // Append the div to an element with the id 'body'
   
  
  
      }

      







 



// useEffect(()=>{
//   document.addEventListener('DOMContentLoaded', function() {
//     const images = document.getElementsByTagName('img');
//     for (let img of images) {
//         img.addEventListener('mousedown', function(e) {
//             e.preventDefault();
//         });
        
//         img.addEventListener('dragstart', function(e) {
//             e.preventDefault();
//         });
//     }
// });

// // Select the div and handle
// const resizableDiv = document.querySelector('.resizable');
// const handle = document.querySelector('.handle');



// // Attach event listeners
// if(resizableDiv){
//   console.log("ADDED SUCCESFUL")
//   resizableDiv.addEventListener('mousedown', startDragging);
// // handle.addEventListener('mousedown', startResizing);
// }

// },[currentSelectedDiv])


// Variables for dragging and resizing
let isDragging = false;
let isResizing = false;
let startX, startY, startWidth, startHeight, startLeft, startTop;

// Function to start dragging
function startDragging(e) {
  if (isResizing) return; // Prevent dragging if resizing is active
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  const resizableDiv = document.querySelector('.resizable');
  startLeft = parseInt(window.getComputedStyle(resizableDiv).left, 10) || 0;
  startTop = parseInt(window.getComputedStyle(resizableDiv).top, 10) || 0;
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', stopDragging);
}

// Function to handle dragging
function onDragMove(e) {
  if (isDragging) {
    const resizableDiv = document.querySelector('.resizable');
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      resizableDiv.style.left = `${startLeft + deltaX}px`;
      resizableDiv.style.top = `${startTop + deltaY}px`;
  }
}

// Function to stop dragging
function stopDragging() {

  isDragging = false;
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', stopDragging);
}

// Function to start resizing
function startResizing(e) {
  const resizableDiv = document.querySelector('.resizable');
  if (isDragging) return; // Prevent resizing if dragging is active
  e.preventDefault();
  isResizing = true;
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(window.getComputedStyle(resizableDiv).width, 10);
  startHeight = parseInt(window.getComputedStyle(resizableDiv).height, 10);
  document.addEventListener('mousemove', onResizeMove);
  document.addEventListener('mouseup', stopResizing);
}

// Function to handle resizing
function onResizeMove(e) {
  const resizableDiv = document.querySelector('.resizable');
  if (isResizing) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const newWidth = startWidth + deltaX;
      const newHeight = startHeight + deltaY;
      
      // Resize the container
      resizableDiv.style.width = `${newWidth}px`;
      resizableDiv.style.height = `${newHeight}px`;
  }
}

// Function to stop resizing
function stopResizing() {
  const resizableDiv = document.querySelector('.resizable');
  isResizing = false;
  document.removeEventListener('mousemove', onResizeMove);
  document.removeEventListener('mouseup', stopResizing);
}

  return (
    <>

     <Router>
      <Routes>
        <Route path="/" element={<Userpanel SelectDiv={SelectDiv}/>}>
          <Route index element={<Content addDiv={addDiv} currentSelectedDiv={currentSelectedDiv} uniqueID={uniqueID} setuniqueID={setuniqueID} SelectDiv={SelectDiv} SelectedElementIs={SelectedElementIs} setSelectedElementIs={setSelectedElementIs} />} />
          <Route path="content" element={<Content />} />
          <Route path="styles" element={<Style currentSelectedDiv={currentSelectedDiv} />} />
          <Route path="advance" element={<Advance currentSelectedDiv={currentSelectedDiv} uniqueID={uniqueID} setuniqueID={setuniqueID} SelectDiv={SelectDiv}   />} />
        </Route>
      </Routes>
    </Router>

 
    </>
  )
}

export default App