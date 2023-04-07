import React from "react";
import "./CreatedSavedBar.css"

const CreatedSavedBar = () => {
    return (
        <>
        <div className="profile-pin-bar-holder">
            <div className="profile-pin-bar-created">Created
                <div className="profile-pin-created-underline"></div>
            </div>
            <div className="profile-pin-bar-saved">Saved
                <div className="profile-pin-saved-underline"></div>
            </div>
        </div>
        </>
    )
}

export default CreatedSavedBar