import React from 'react';
import "../ModalCSS/Modal.css";

const ContactDetailsModal = ({ contact, closeModal }) => {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Contact Details</h1>
                </div>
                <div className="body">
                    <p>Phone: {contact.phone}</p>
                    <p>Country: {contact.country.name}</p>
                    {/* Add more contact details as needed */}
                </div>
                <div className="footer">
                    <button onClick={() => closeModal(false)} className='modalButtonC'>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsModal;
