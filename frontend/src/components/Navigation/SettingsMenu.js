import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import "./SettingsMenu.css"
import "./LoggedInNavigation.css"

function SettingsMenu({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      {/* <img src="../../../assets/down-arrow.svg" className="logo_loggedin" onClick={openMenu}/> */}
      <button className="drop-down-icon" onClick={openMenu}>
        <i className="fa-solid fa-angle-down" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="drop-down-currently">Currently in</div>
          <div className="drop-down-snapshot"> 
          <div className="drop-down-picture-container">
            <div className="drop-down-picture">{user.username.slice(0,1).toUpperCase()}</div>
            </div>
            <div className="drop-down-account-details">
              <div className="drop-down-username">{user.username}</div>
              <div className="drop-down-email">{user.email}</div>
            </div>
            <div className="drop-down-checkmark-container">
            <div className="drop-down-checkmark">
              <i class="fa-solid fa-check"></i>
              </div>
            </div>
          </div>
          <div className="drop-down-more-options">More options</div>
          <div className="drop-down-option" onClick={logout}>Log out</div>
        </div>
      )}
    </>
  );
}

export default SettingsMenu;
