import React from 'react'
import './Modal.css'


function Modal({ closeModal }) {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <h5 className='title'>Buy</h5>
            <h4>Coronet</h4>
            <p>144880 gold</p>
            <div className='button-container'>
            <button className='button1'>Yes</button>
            <button className='button2' onClick={() => closeModal(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default Modal