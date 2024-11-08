import React from 'react';
import "./ModalNavigate.css";

const ModalNavigate = () => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Hello</h2>
                <div className="modal-body">Hello</div>
            </div>
        </div>
    )
}

export default ModalNavigate