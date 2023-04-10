import React from "react";
import "./EditProfileButtons.css"

const EditProfileButtons = ({handleClick, handleReset}) => {

    return (
        <>
        <div className="edit-form-button-holder">
            <button className="edit-form-form-reset-button" onClick={handleReset}>Reset</button>
            <button className="edit-form-form-submit-button" onClick={handleClick}>Save</button>
        </div>
        </>
    )
    
}

export default EditProfileButtons;