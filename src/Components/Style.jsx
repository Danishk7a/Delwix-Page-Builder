import React, {useEffect, useState} from 'react'
import GradientGenerator from './Utility/GradientGenerator';
const Style = ({currentSelectedDiv}) => {
 
  const ColorChange = (e)=>{
    const div = document.getElementById(currentSelectedDiv);
    div.style.color = e.target.value;
     
 }
 
 const BGChange = (e)=>{
    // console.log(e.target.value);
    const div = document.getElementById(currentSelectedDiv);
    div.style.backgroundColor = e.target.value ;
     
 
  }
  const [gradientonToggle, setgradientonToggle] = useState(0)
  const gradientOn = ()=>{
   
    if(gradientonToggle){
      setgradientonToggle(0)
    }else{
      setgradientonToggle(1)
    }

  }
useEffect(()=>{

  const palette = document.querySelectorAll('.palette div');
  palette.forEach(item => item.addEventListener('click', (e)=>{
    const color = e.target.dataset.color;
    document.getElementById(currentSelectedDiv).style.backgroundColor = color
    
  }));
},[])

 

  return (
   <>
   <div>BG :     <input  type="color" onChange={BGChange} /> Color :     <input  type="color" onChange={ColorChange} /></div>
  
 { gradientonToggle ?  <div  style={{position:'absolute', height:'100vh', width:'100%', padding:'20px', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#00000080', overflow:'hidden', top:'0px', left:'0px', zIndex:1200}}><GradientGenerator  gradientOn={gradientOn} /></div> :<></>}
   <button onClick={gradientOn}>Gradient Generator</button>

   <div className="palette" style={{display:'flex', }}>
                <div style={{backgroundColor: "#FF5733"}} data-color="#FF5733"></div>
                <div style={{backgroundColor: "#33FF57"}} data-color="#33FF57"></div>
                <div style={{backgroundColor: "#3357FF"}} data-color="#3357FF"></div>
                <div style={{backgroundColor: "#FFFF33"}} data-color="#FFFF33"></div>
                <div style={{backgroundColor: "#FF33FF"}} data-color="#FF33FF"></div>
            </div>
   
   
   </>
  )
}

export default Style