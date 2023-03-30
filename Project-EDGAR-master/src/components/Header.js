import React from 'react'
import Particles from "./Particles";
import ReactTypingEffect from 'react-typing-effect';
const Header = () => {
  return (
    <div>
        
      <div className ="bg1">
        <h3 className="info"> <ReactTypingEffect
        text={["E.D.G.A.R."]}
      />
         <br /> Extraterrestrial Debris Graphical Associative Renderer
        </h3>
        <Particles/>
        
      </div>
      
    </div>
  )
}

export default Header
