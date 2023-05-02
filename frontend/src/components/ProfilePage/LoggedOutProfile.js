import React from "react";
import UserDetails from "./UserDetails";
import LoggedOutActionButtons from "./LoggedOutActionButtons";
import CreatedSavedBar from "./CreatedSavedBar";
import LoggedInActionButtons from "./LoggedInActionButtons";


const LoggedOutProfile = () => {

    return (
        <>
        <UserDetails />
        <LoggedInActionButtons />
        <CreatedSavedBar />
        </>
    )
}

export default LoggedOutProfile;