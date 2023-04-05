import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, fetchUser } from "../../store/users"

const UserProfile = () => {
    const dispatch = useDispatch();
    // const { userId } = useParams();
    const  userId  = 1;
    const user = useSelector(state => state.users[userId])
    const user2 = useSelector(getUser(userId))
    const sessionUser = useSelector(state => state.session.user);
    // debugger


    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])

    //null seebench
    return (
        <>
        <div>"Testing User profile"</div>
        {/* <div>{sessionUser.username}</div> */}
        {/* <div>{user.username}</div> */}
        </>
    )
}

export default UserProfile;