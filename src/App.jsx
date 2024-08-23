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
      const SelectDiv = (e)=>{
     
      if(e.target.className !== 'non_selectables'){
        setcurrentSelectedDiv(e.target.id)
        console.log(e.target.id);
        document.querySelectorAll('.clickable-div').forEach(div => {
           div.classList.remove('selected');
         });
   
         // Add 'selected' class to the clicked div
         e.target.classList.add('selected');
  
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
          div.style.width = '100%' ;
          div.style.height = '100px';
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

  return (
    <>

     <Router>
      <Routes>
        <Route path="/" element={<Userpanel SelectDiv={SelectDiv}/>}>
          <Route index element={<Content addDiv={addDiv} currentSelectedDiv={currentSelectedDiv} uniqueID={uniqueID} setuniqueID={setuniqueID} SelectDiv={SelectDiv} />} />
          <Route path="content" element={<Content />} />
          <Route path="styles" element={<Style currentSelectedDiv={currentSelectedDiv} />} />
          <Route path="advance" element={<Advance />} />
        </Route>
      </Routes>
    </Router>

 
    </>
  )
}

export default App