import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

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
        {sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
