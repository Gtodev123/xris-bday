import React from 'react';
import right from './asets/inventory.jpg'
import './Right.css'


function Right() {
  return (
    <div className="inventory">
     <h2 className='HomeH2'>Inventory</h2>
     <img src={right} alt="gheed" />
    </div>
  );
}

export default Right;