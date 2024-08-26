import React, { createElement, useState, useEffect, useCallback } from 'react'
import './CSSFILE.css'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Userpanel = ({SelectDiv}) => {

  
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
    
    const [uniqueID, setuniqueID] = useState(0)
    const addDiv = ()=>{

          const div = document.createElement('div');
          const width_div = document.createElement('div');
          const height_div = document.createElement('div');
           width_div.addEventListener('mousedown',resizeX);
           height_div.addEventListener('mousedown',resizeY);
           width_div.style.position = 'absolute';
           width_div.style.height = '100%';
           width_div.style.width = '5px';
           width_div.style.right = 0;
           width_div.style.cursor = 'e-resize'
           width_div.className = 'non_selectables';
           height_div.className = 'non_selectables';

           height_div.style.position = 'absolute';
           height_div.style.height = '5px';
           height_div.style.width = '100%';
           height_div.style.bottom = 0;
           height_div.style.cursor = 's-resize'

           
          const parent =   document.getElementById(currentSelectedDiv);
             div.id = `div-${uniqueID}`
        
             setuniqueID((pre)=> pre +1);
             console.log(uniqueID)

      //   div.textContent = 'This is a dynamically created div with inline CSS.';
      div.className = 'clickable-div';
        // Apply CSS directly using the style property
        // div.style.width = `${100}%` ;
        div.style.width = '50%' ;
        div.style.height = '100px';
        div.style.backgroundColor = parent.style.backgroundColor === 'black' ? 'blue':'black';
        div.style.color = '#f2f2f2';
        div.style.position = 'relative';
        div.onclick = SelectDiv
        div.style.display = 'flex';
        div.style.justifyContent= 'start'
        div.style.alignItems = 'start'
        div.style.gap = '10px'
      //   div.style.border = '2px solid darkblue';
        div.style.overflow = "hidden"
        // div.style.padding = "20px"
        // div.style.cursor = cursor ? "pointer":"arrow"
        // div.onclick = handleClick;
        // div.addEventListener('mousemove', handleMouseMove);
        
        div.appendChild(width_div)
        div.appendChild(height_div)
        parent.style.height = `100vh`
        parent.style.height = window.innerWidth
      parent.appendChild(div);
         

        if(div.id === 'div-0'){
          div.click();
        }


        
        // Append the div to an element with the id 'body'
 


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

const fontSize = (e)=>{
   console.log("Font SIze :", e.target.value);
   const div = document.getElementById(currentSelectedDiv);
   div.style.fontSize = `${e.target.value}px`;



}

const FontFamily = ['Verdana','Geneva', 'Courier New','Segoe UI','Times New Roman' ];


const changeFontFamily = ()=>{

   const randomKey =  Math.floor(Math.random() * 5);
   const div = document.getElementById(currentSelectedDiv);
   div.style.fontFamily = FontFamily[randomKey];


} 
const paddingHandle = (e)=>{
   const div = document.getElementById(currentSelectedDiv);
   div.style.padding = `${e.target.value}px`;


}



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

    const hide = ()=>{
      const menu = document.getElementById('menu');
      menu.style.display = 'none'

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
      const width_div = document.createElement('div');
      const height_div = document.createElement('div');
       width_div.addEventListener('mousedown',resizeX);
       height_div.addEventListener('mousedown',resizeY);
       width_div.style.position = 'absolute';
       width_div.style.height = '100%';
       width_div.style.width = '5px';
       width_div.style.right = 0;
       width_div.style.cursor = 'e-resize'
       width_div.className = 'non_selectables';
       height_div.className = 'non_selectables';

       height_div.style.position = 'absolute';
       height_div.style.height = '5px';
       height_div.style.width = '100%';
       height_div.style.bottom = 0;
       height_div.style.cursor = 's-resize'
       img.appendChild(width_div)
       img.appendChild(height_div)

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

    const Opacity = (e)=>{
      const div = document.getElementById(currentSelectedDiv);
      const opacityValue = e.target.value / 100; // Assuming the input range is 0-100
      div.style.opacity = opacityValue;


    }
    
    function downloadHTMLAndCSS() {
      // Function to get computed styles of an element
      function getComputedStyles(element) {
        const styles = window.getComputedStyle(element);
        const css = {};
        
        for (let i = 0; i < styles.length; i++) {
          const property = styles[i];
          css[property] = styles.getPropertyValue(property);
        }
        
        return {
          element: element.tagName,
          id: element.id,
          class: element.className,
          styles: css
        };
      }
    
      // Get the element with ID 'parent'
      const parentElement = document.getElementById('body');
      
      // Check if the element is valid
      if (!parentElement || !(parentElement instanceof HTMLElement)) {
        console.error('Element with ID "parent" not found or invalid');
        return;
      }
      
      // Get HTML and CSS of the parent element and its children
      const html = parentElement.outerHTML;
      const css = getComputedStyles(parentElement);
      const childElements = parentElement.getElementsByTagName('*');
      const childrenCSS = [];
    
      for (let i = 0; i < childElements.length; i++) {
        childrenCSS.push(getComputedStyles(childElements[i]));
      }
    
      // Create content for the text file
      const content = [
        'HTML:\n',
        html,
        '\n\nCSS:\n',
        JSON.stringify(css.styles, null, 2),
        '\n\nChildren CSS:\n',
        JSON.stringify(childrenCSS, null, 2)
      ].join('');
    
      // Create a Blob and a download link
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'element.html.css.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
    

    function downloadChangedCSS() {
      // Function to get inline styles of an element
      function getInlineStyles(element) {
        const inlineStyles = element.style;
        const css = {};
        
        for (let i = 0; i < inlineStyles.length; i++) {
          const property = inlineStyles[i];
          css[property] = inlineStyles.getPropertyValue(property);
        }
        
        return {
          element: element.tagName,
          id: element.id,
          class: element.className,
          styles: css
        };
      }
    
      // Get the element with ID 'parent'
      const parentElement = document.getElementById('body');
      
      // Check if the element is valid
      if (!parentElement || !(parentElement instanceof HTMLElement)) {
        console.error('Element with ID "parent" not found or invalid');
        return;
      }
      
      // Get inline CSS of the parent element and its children
      const css = getInlineStyles(parentElement);
      const childElements = parentElement.getElementsByTagName('*');
      const childrenCSS = [];
    
      for (let i = 0; i < childElements.length; i++) {
        childrenCSS.push(getInlineStyles(childElements[i]));
      }
    
      // Create content for the text file
      const content = [
        'CSS:\n',
        JSON.stringify(css.styles, null, 2),
        '\n\nChildren CSS:\n',
        JSON.stringify(childrenCSS, null, 2)
      ].join('');
    
      // Create a Blob and a download link
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'changed-styles.txt';
      a.click();
      URL.revokeObjectURL(url);
    }

    const CompleteTree = []
    const traverseElementTree = () => {
     const element = document.getElementById('body') 
      if (!element || !(element instanceof HTMLElement)) {
        console.error('Invalid element');
        return;
      }
    
     
      const traverse = (el) => {
        if (el.id) {
          // console.log("Element ID:", el.id); 
          CompleteTree.push(el.id)
        }
    
        Array.from(el.children).forEach(child => {
          traverse(child);  // Recursively traverse each child element
        });
      };
    
      traverse(element);

      console.log(CompleteTree)
    };
    const [Theme, setTheme] = useState(null)
    const CurrentThemeProps = {}
    const GetTheme = ()=>{
      traverseElementTree();

      CompleteTree.forEach((e)=>{
       const ele = document.getElementById(e);
       const computedStyle = window.getComputedStyle(ele);
        CurrentThemeProps[e] = {  backgroundColor: computedStyle.backgroundColor,color: computedStyle.color,height: computedStyle.height, width:computedStyle.width}
      //  console.log(e, {
      //    backgroundColor: computedStyle.backgroundColor,
      //    color: computedStyle.color });
       
      })

      console.log(CurrentThemeProps);
      setTheme(CurrentThemeProps)



    }


const palette_1 = ["#003049", "#d62828", "#f77f00", "#fcbf49"]
const palette_2 = ["#f72585", "#3a0ca3", "#7209b7", "#4361ee"]
const palette_3 = ["#000814", "#001d3d", "#003566", "#ffc300"]
const palette_4 = ["#335c67", "#fff3b0", "#e09f3e", "#9e2a2b"]
const palette_5 = ["#320D6D","#FFBFB7","#700353","#2D0C63"]

const combinedPalette = [
  ...palette_1,
  ...palette_2,
  ...palette_3,
  ...palette_4,
  ...palette_5
];
    const ThemeChange = ()=>{
      
      const obj = Theme;
    




setTheme(obj);
console.log(obj)
let uniqueColors = []
const uniqueBG = []
Object.keys(obj).forEach(key => {
  
  uniqueBG.push(obj[key].backgroundColor);
   uniqueColors.push(obj[key].color)

    });


const BG = [...new Set(uniqueBG)];
const Colors = [...new Set(uniqueColors)];
const BGMAP = {}
// console.log("THIDIS IS BG : ",BG)

for(let i=0 ; i <BG.length;i++){
  let random = Math.floor(Math.random()*BG.length);
  BGMAP[BG[i]] = combinedPalette[random];
}


console.log("THIDIS IS BG MAP : ",BGMAP)
Object.keys(obj).forEach(key => {

const ele = document.getElementById(key);


Object.keys(BGMAP).forEach(key=>{         

if(ele.style.backgroundColor= key){
  ele.style.backgroundColor = BGMAP[key];
  console.log("INSIDE")
}
   
   


})

  
  
  });
 

}
    


  // Resizeabele DIVs =========================================================================================================


  const [X, setX] = useState(200);
  const [xy, setxy] = useState('both')
  const [Y, setY] = useState(50);
  let previousX = null;
  let previousY = null;
  
 useEffect(()=>{
  // document.getElementById('menu')
 const div = document.getElementById(currentSelectedDiv)
  if(div.id !== 'body'){
    div.style.width = `${X}px`;
    div.style.height = `${Y}px`;
  }


 },[X,Y])

  const mouseMoveHandler = useCallback((event) => {
    const x = event.clientX;
    const Y = event.clientY;
  // console.log("LOOK MN ", x)
    let maxWidth = window.innerWidth;
    let minWidth = 20;

    if (previousX !== null  && previousY !== null ) {
      
   
      setX(x)
      setY(Y)
   
   
   
   
    }

    previousX = x;
    previousY = Y;
  }, []);

  const mouseUpHandler = useCallback(() => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }, [mouseMoveHandler]);

 

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [mouseMoveHandler, mouseUpHandler]);

  
  const resizeX = () => {
    console.log('X')
    setxy('x')
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const resizeY = () => {
    setxy('y')
    console.log('Y')
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  // Resizeabele DIVs =========================================================================================================


const MobileView = ()=>{
  const body = document.getElementById('body');
  body.style.width = '350px';
  body.style.height = '90vh';
  body.style.border = '1px solid grey';
  body.style.borderRadius = '25px';



  
  const backbody = document.getElementById('backbody');
  backbody.style.display = 'flex'
  backbody.style.justifyContent = 'center'
  backbody.style.alignItems = 'center'





}

const ExportCode = ()=>{
  
}

  const tryFn = ()=>{

    console.log("Try function called " )
    const div = document.getElementById(currentSelectedDiv);
    function getExplicitStyles(element) {
      const computedStyle = window.getComputedStyle(element);
      const explicitStyles = {};
    
      // Get all properties from the element's style attribute
      const inlineStyles = element.style;
      for (let i = 0; i < inlineStyles.length; i++) {
        const property = inlineStyles[i];
        explicitStyles[property] = inlineStyles.getPropertyValue(property);
      }
    
      // Optionally, you can check for default values and include them
      // in your explicitStyles object if you need to.
      return explicitStyles;
    }
    const styles = getExplicitStyles(div);
console.log(styles);

}
   return (
   
     <>
     <div style={{display:'flex'}}>
       
        <div id='menu' style={{display:'flex', flexDirection:'column', gap:'',width:"20%", border:'1px solid grey',height:'100vh', overflowY:'scroll', position:'relative', overflowX:'hidden'}}>

          <div style={{display:'flex',height:'5vh', width:'20%', backgroundColor:'#242424', position:'fixed', bottom:'0px', justifyContent:'center', gap:'20px', alignItems:'center', zIndex:'1200'}}>
            
            <div style={{cursor:'pointer'}} onClick={MobileView}>Mobile View</div>
            <div style={{cursor:'pointer'}} onClick={ExportCode}>Export Code</div>

          </div>
        

<div style={{height:'20px', background: 'linear-gradient(to right, #a8f79d, #79bfd9,  #ed89c8, #bf8aee, #e2c1ae )', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px', color:'white', opacity:'80%'}}>ReDesign</div>
<div  style={{display:'flex', gap:'10px', alignItems:'center', justifyContent:'space-around', backgroundColor:'#131313', padding:'10px'}}>

<Link className='Link' to='/'>Structure</Link>
<Link className='Link' to='/Styles'>Style</Link>
<Link className='Link' to='/Advance'>Media</Link>





</div>

<div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>

<img src="http://localhost:5173/Intro.gif" height={200} width={200} alt="" />

</div>

<div style={{padding:'20px'}}>



<div>
<Outlet></Outlet>
</div>

</div>


      
      
      
      
      
        </div>


      
       <div id='backbody' style={{width:'80%',height:window.innerHeight, color:'#f2f2f2', overflowY:'scroll', overflowX:'hidden',backgroundColor:'#242424' }}>

       <div className='clickable-div' onClick={SelectDiv} id='body' style={{height:window.innerHeight, color:'#f2f2f2', overflowY:'scroll', overflowX:'hidden',backgroundColor:'#171717', width:'100%'}}>

{/* <div className='non_selectables' style={{width:'100%', height:'24vh', display:'flex', justifyContent:'center', alignItems:'center'}}>

<div className='non_selectables' >Add Element</div>

</div> */}


</div>

       </div>


     </div>




     </>
  )
}

export default Userpanel