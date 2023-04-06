import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, fetchUser } from "../../store/users"
import LoggedInProfile from "./LoggedInProfile";
import LoggedOutProfile from "./LoggedOutProfile";


//Need CSS files for both logged in and out

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])

    
    if (!user) {
        return null;
    }

    let ProfilePage;

    if (sessionUser.id === user.id) {
        ProfilePage = <LoggedInProfile />
    } else {
        ProfilePage = <LoggedOutProfile />
    }

    return (
        <>
        <div>"Testing User profile"</div>
        {/* <div>{(user.username).slice(0,1).toUpperCase()}</div>
        <div>@{user.username}</div>
        <div>{user.first_name}</div>
        <div>{user.last_name}</div>
        <div>{user.about}</div>
        <div>{user.website}</div>
        <div>{user.email}</div> */}
        <div>{ProfilePage}</div>
        <div>Session User username: {sessionUser.username} </div>
        <div>Session User id: {sessionUser.id}</div>
        <div> User username: {user.username} </div>
        <div> User id: {user.id} </div>
        </>
    )
}

export default UserProfile;