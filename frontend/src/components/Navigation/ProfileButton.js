import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom'


const ProfileButton = ({ user }) => {


  // const sessionUser = useSelector(state => state.session.user);

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

