import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoggedInNavigation.css';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton'


const LoggedInNavigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    

    return (
        <nav>
        <div className="nav-left">
          <NavLink exact to="/">
              <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo_loggedin"/>
          </NavLink>
        </div>
        <div className="nav-right">
            <ProfileButton user={sessionUser} />
        </div>
      </nav>
    )
}

export default LoggedInNavigation;

