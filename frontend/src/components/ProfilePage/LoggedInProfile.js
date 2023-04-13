import React from "react";
import UserDetails from "./UserDetails";
import LoggedInActionButtons from "./LoggedInActionButtons";
import CreatedSavedBar from "./CreatedSavedBar";
import PinIndex from "../Pins/PinIndex";


const LoggedInProfile = () => {

    return (
        <>
        <UserDetails />
        <LoggedInActionButtons />
        {/* <CreatedSavedBar /> */}
        {/* <PinIndex /> */}
        </>
    )
}

export default LoggedInProfile;