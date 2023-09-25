import React, { useState } from 'react';
import left from './asets/gheed.png'
import unhoveredCoronet from './asets/unhovered-coronet.png'
import hoveredCoronet from './asets/hovered-coronet.png'
import Modal from './Modal';

import './Left.css'

function Left() {

    const [openModal, setOpenModal] = useState(false)
    const [isHovered , setIsHovered] = useState(false);


    const handleMouseEnter = () => {
        setIsHovered(true);

      };

    const handleMouseLeave = () => {
        setIsHovered(false);
      };


  return (
    <div className="GheedStore">
     <h2 className='HomeH2'>Gheed Shop</h2>
     <img className='gheedbackground' src={left} alt="gheed" />
     {openModal && <Modal closeModal={setOpenModal}/>}
     <img onClick={() => {setOpenModal(true)}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='unhoveredCoronet' src={isHovered ? hoveredCoronet : unhoveredCoronet} alt='unhovered coronet'/>
     <img onHover={() => {}} style={{display: 'none'}}className='hoveredCoronet' src={hoveredCoronet} alt='unhovered coronet'/>
    </div>
  );
}

export default Left;