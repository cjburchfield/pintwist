import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, fetchUser } from "../../store/users"
import LoggedInProfile from "./LoggedInProfile";
import LoggedOutProfile from "./LoggedOutProfile";
import { Redirect } from "react-router-dom";

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

    if (!sessionUser) {
        return <Redirect to="/" />;
      }

    let ProfilePage;

    if (sessionUser.id === user.id) {
        ProfilePage = <LoggedInProfile />
    } else {
        ProfilePage = <LoggedOutProfile />
    }


    return (
        <>
        <div>{ProfilePage}</div>
        </>
    )
}

export default UserProfile;