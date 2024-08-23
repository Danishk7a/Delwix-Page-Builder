import React from 'react'




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

  return (
   <>
   <div style={{display:'flex', flexDirection:'column', gap:'20px', justifyContent:'center'}}>
   
        <button onClick={addDiv}>AddDIV</button>
        <button onClick={deleteDiv}>Delete DIV</button>

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