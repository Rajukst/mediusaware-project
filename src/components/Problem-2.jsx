import React, { useState } from 'react';
import ModalA from './Modals/ModalA';
import ModalB from './Modals/ModalButtons/ModalB';

const Problem2 = () => {
    const [openModalA, setOpenModalA]= useState(false)
    const [openModalB, setOpenModalB]= useState(false)

    return (
          <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>       
                <div className="d-flex justify-content-center gap-3">
                <button onClick={()=>setOpenModalA(true)} className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                <button onClick={()=>setOpenModalB(true)}  className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                </div>
                {openModalA && <ModalA closeModalA={setOpenModalA}/>}
                {openModalB && <ModalB closeModalB={setOpenModalB}/>}
            </div>
        </div>
        </>
    );
};

export default Problem2;