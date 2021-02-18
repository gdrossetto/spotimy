import React from 'react';
import './modal-input.component.styles.scss'

const Modal = ({show,onCreate,onCancel,onType,value}) => {
    return (
        <div className={"modal p-4"} style={{display: show ? 'block' : 'none'}}>
            <h3 className={"text-center"}>Choose the name of your new playlist!</h3>
            <div className="mb-3">
                <input type="text" value={value} onChange={(e)=>onType(e.target.value)} className="form-control w-50 m-auto mt-4" id="exampleFormControlInput1"/>
                <button onClick={onCreate} className={"btn btn-green-outline d-block m-auto mt-4"}>Create Playlist</button>
                <button onClick={onCancel} className={"btn btn-outline-danger d-block m-auto mt-4"}>Cancel</button>
            </div>
        </div>
    );
}

export default Modal;
