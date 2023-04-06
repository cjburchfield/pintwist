import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, fetchUser } from "../../store/users"
//Need CSS file

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    // const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])

    
    if (!user) {
        return null;
    }

    return (
        <>
        <div>"Testing User profile"</div>
        <div>{user.username}</div>
        </>
    )
}

export default UserProfile;