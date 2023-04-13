import React from "react";
import "./CreatedSavedBar.css";
import { useHistory } from "react-router-dom";
import PinIndex from "../Pins/PinIndex";


const CreatedSavedBar = () => {
    const history = useHistory();

    return (
        <>
        <div className="profile-pin-bar-holder">
        {/* <div className="profile-pin-bar-created" onClick={() => history.push("/home")}>Created */}
        <div className="profile-pin-bar-created">Created
                <div className="profile-pin-created-underline"></div>
            </div>
        <PinIndex />
            {/* <div className="profile-pin-bar-saved">Saved
                <div className="profile-pin-saved-underline"></div>
            </div> */}
        </div>
        </>
    )
}

export default CreatedSavedBar