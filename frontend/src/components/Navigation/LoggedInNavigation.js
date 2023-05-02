import React, { useEffect, useState} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './LoggedInNavigation.css';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton'
import SettingsMenu from './SettingsMenu';
import LoggedInSocialLinks from './LoggedInSocialLinks';
import SearchBar from './SearchBar';
import { getCurrentUser } from '../../store/session';
import { getUser, fetchUser } from '../../store/users';

const LoggedInNavigation = () => {
  const currentUser = useSelector(getCurrentUser);

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
        <div className="nav-middle">
          <SearchBar />
        </div>
        <div className="nav-right">
            <LoggedInSocialLinks />
            <ProfileButton user={currentUser} />
            <SettingsMenu user={currentUser} />
        </div>
      </nav>
    )
}

export default LoggedInNavigation;

