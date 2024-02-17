import React from 'react';

const ModalB = ({closeModalB}) => {
    return (
        <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">
               <h1>Modal B US Contacts</h1>
            </div>
            <div className="body">
                    <p>This is modal B & Showing US Contacts</p>
                </div>
                <div className="footer">
                    <button className='modalButtonA'>All Contacts</button>
                    <button className='modalButtonB'>US Contacts</button>
                    <button onClick={()=>closeModalB(false)} className='modalButtonC'>Close</button>
                    </div>
                    <div className="footers">
                       <label htmlFor="even">Only Even</label>
                       <input
            type="checkbox"
            id="evenCheckboxA"
          />
                        </div>
        </div>
    </div>
    );
};

export default ModalB;