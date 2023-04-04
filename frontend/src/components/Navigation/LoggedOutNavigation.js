import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './LoggedOutNavigation.css';

const LoggedOutNavigation = () => {
    return (
        <nav>
        <div className="nav-left">
          <NavLink exact to="/">
              <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo"/>
          </NavLink>
          <NavLink exact to="/" className="brand-name">
              Pintwist 
          </NavLink>
        </div>
        <div className="nav-right">
            <LoginFormModal />
            <SignupFormModal/>
        </div>
      </nav>
    )
}

export default LoggedOutNavigation;





