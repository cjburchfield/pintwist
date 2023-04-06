import React from "react";
import UserDetails from "./UserDetails";
import LoggedInActionButtons from "./LoggedInActionButtons";
import CreatedSavedBar from "./CreatedSavedBar";


const LoggedInProfile = () => {

    return (
        <>
        <UserDetails />
        <LoggedInActionButtons />
        <CreatedSavedBar />
        </>
    )
}

export default LoggedInProfile;