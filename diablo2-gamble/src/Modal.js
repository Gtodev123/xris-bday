import React from 'react'
import './Modal.css'


function Modal({ closeModal }) {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <h5 className='title'>Buy</h5>
            <p>Coronet</p>
            <p>144880 gold</p>
            <div className='button-container'>
            <button className='button'>Yes</button>
            <button className='button' onClick={() => closeModal(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default Modal