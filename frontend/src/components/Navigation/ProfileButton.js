import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom'

function ProfileButton({ user }) {
  return (
    <div>
      <Link to="/">
        <button className="profile-picture"><i className="fa-solid fa-user-circle" /></button>
      </Link>
    </div>
  );
}

export default ProfileButton;
