import { Link } from 'react-router-dom';
import React from "react";


const ProfileButton = ({user}) => {

  return (
    <div>
      <Link to={`/users/${user.id}`}>
        <div className="nav_profile_container">
          <p className="nav_profile">{user.username.slice(0, 1).toUpperCase()}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProfileButton;

