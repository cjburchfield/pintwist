import React from "react";
import "./LoggedInActionButtons.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, fetchUser } from "../../store/users"
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LoggedInActionButtons = ( ) => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    let user = useSelector(getUser(userId));


    return (
        <>
            <NavLink to={`/users/${userId}/edit`}>
                <div className="profile-edit-button-holder">
                <div className="profile-edit-button">Edit</div>
                </div>
</NavLink>
        </>
    )
}

export default LoggedInActionButtons;

