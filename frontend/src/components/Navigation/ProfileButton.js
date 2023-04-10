import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUser, fetchUser } from "../../store/users"


const ProfileButton = ({ user }) => {
  // const ProfileButton = () => {


  // const dispatch = useDispatch();
  // const { userId } = useParams();
  // const user = useSelector(getUser(userId))

  // useEffect(() => {
  //     dispatch(fetchUser(userId))
  // }, [dispatch, userId])

  
  // if (!user) {
  //     return null;
  // }


  return (
    <div>
      {/* <Link to={`/users/${sessionUser.id}`}> */}
      <Link to={`/users/${user.id}`}>
        <div className="nav_profile_container">
          <p className="nav_profile">{user.username.slice(0, 1).toUpperCase()}</p>
          {/* <p className="nav_profile">{sessionUser.username.slice(0, 1).toUpperCase()}</p> */}
        </div>
      </Link>
    </div>
  );
}

export default ProfileButton;

