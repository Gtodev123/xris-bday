import React, { useState } from 'react';
import left from './asets/gheed.png'
import unhoveredCoronet from './asets/unhovered-coronet.png'
import hoveredCoronet from './asets/hovered-coronet.png'

import './Left.css'

function Left() {

    const [isHovered , setIsHovered] = useState(false);
    

    const handleMouseEnter = () => {
        setIsHovered(true);

      };

    const handleMouseLeave = () => {
        setIsHovered(false);
      };



  return (
    <div className="GheedStore">
     <h2>Gheed Shop</h2>
     <img className='gheedbackground' src={left} alt="gheed" />
     <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='unhoveredCoronet' src={isHovered ? hoveredCoronet : unhoveredCoronet} alt='unhovered coronet'/>
     <img style={{display: 'none'}}className='hoveredCoronet' src={hoveredCoronet} alt='unhovered coronet'/>
    </div>
  );
}

export default Left;