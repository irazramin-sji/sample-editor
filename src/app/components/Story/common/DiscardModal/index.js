import React from 'react'
import "./discard-modal.style.scss"

const DiscardModal = ({ showDiscardModal, setShowDiscardModal }) => {
    const history = useHistory();
  return (
    <div className='discard-modal'>
        <div className={`modal-area ${showDiscardModal ? 'show' : ''}`}>
            <p>Do you want to discard your story?</p>

            <div className="action-btn">
                <button onClick={() => setShowDiscardModal(false)}>No</button>
                <button className='yes' onClick={() => history.goBack()}>Yes</button>
            </div>
        </div>
    </div>
  )
}

export default DiscardModal