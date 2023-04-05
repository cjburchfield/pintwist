import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom'

function ProfileButton({ user }) {
  return (
    <div>
      <Link to="/">
        <div className="nav_profile_container">
          <p className="nav_profile">{user.email.slice(0, 1).toUpperCase()}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProfileButton;
