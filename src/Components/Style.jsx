import React, {useState} from 'react'
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
 

  return (
   <>
   <div>BG :     <input  type="color" onChange={BGChange} /> Color :     <input  type="color" onChange={ColorChange} /></div>
  
 { gradientonToggle ?  <div  style={{position:'absolute', height:'100vh', width:'100%', padding:'20px', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#00000080', overflow:'hidden', top:'0px', left:'0px', zIndex:1200}}><GradientGenerator  gradientOn={gradientOn} /></div> :<></>}
   <button onClick={gradientOn}>Gradient Generator</button>
   
   
   </>
  )
}

export default Style