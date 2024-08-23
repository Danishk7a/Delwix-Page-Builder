import React from 'react'
import { Link } from 'react-router-dom'
import GradientGenerator from '../Utility/GradientGenerator'

const ThreeMenu = ({setchangeModel, setcanvasColor, setlightIntensity}) => {
 
    const LoadChair = () => {
        console.log('Loading chair model')
        setchangeModel('./scene3.gltf')
    }

    const LoadShoe = () => {
        console.log('Loading shoe model')
        setcanvasColor(0xff00f4)
    }
 
    return (
        <>
           <div style={{height:'20px', background:'linear-gradient(124deg, #5b10b4, rgba(215,38,61,1) 100%)', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px', color:'white', opacity:'80%'}}>ReDesign</div>
<div  style={{display:'flex', gap:'10px', alignItems:'center', justifyContent:'space-around', backgroundColor:'#131313', padding:'10px'}}>

<Link className='Link' to='/'>Structure</Link>
<Link className='Link' to='/Styles'>Style</Link>
<Link className='Link' to='/Advance'>Canvas</Link>






</div>
        </>
    )
}

export default ThreeMenu