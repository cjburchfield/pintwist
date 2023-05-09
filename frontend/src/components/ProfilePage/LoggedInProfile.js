import React from "react";
import UserDetails from "./UserDetails";
import LoggedInActionButtons from "./LoggedInActionButtons";
import CreatedSavedBar from "./CreatedSavedBar";
import PinIndex from "../Pins/PinIndex";


const LoggedInProfile = () => {

    return (
        <>
        <div className="profile-container">
        <UserDetails />
        <LoggedInActionButtons />
        <CreatedSavedBar />
        {/* <PinIndex /> */}
        </div>
        </>
    )
}

export default LoggedInProfile;