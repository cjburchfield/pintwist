import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoggedInNavigation.css';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton'
import SettingsMenu from './SettingsMenu';
import LoggedInSocialLinks from './LoggedInSocialLinks';


const LoggedInNavigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    

    return (
        <nav>
        <div className="nav-left">
          <NavLink exact to="/home">
            <div className="nav-logo-container">
              <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo_loggedin"/>
              </div>
          </NavLink>
          <NavLink exact to="/home">
            <div className="nav-home-container">
              <div className="login_nav_button">Home</div>
            </div>
          </NavLink>
          <NavLink exact to="/pin-builder">
            <div className="nav-home-container">
              <div className="login_nav_button">Create Pin</div>
            </div>
          </NavLink>
        </div>
        <div className="nav-right">
            <LoggedInSocialLinks />
            <ProfileButton user={sessionUser} />
            <SettingsMenu user={sessionUser} />
        </div>
      </nav>
    )
}

export default LoggedInNavigation;

