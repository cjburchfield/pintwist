import React from "react";
import UserDetails from "./UserDetails";
import LoggedOutActionButtons from "./LoggedOutActionButtons";
import CreatedSavedBar from "./CreatedSavedBar";


const LoggedOutProfile = () => {

    return (
        <>
        <UserDetails />
        <LoggedOutActionButtons />
        <CreatedSavedBar />
        </>
    )
}

export default LoggedOutProfile;