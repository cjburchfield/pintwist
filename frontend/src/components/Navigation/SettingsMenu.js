import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./SettingsMenu.css"

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
      <button className="drop-down-icon" onClick={openMenu}>
        <i className="fa-solid fa-angle-down" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="drop-down-currently">Currently in:</div>
          <div className="drop-down-snapshot"> 
            <div className="drop-down-picture">ProfilePicture</div>
            <button><i className="fa-solid fa-user-circle" /></button>
            <div className="drop-down-account-details">
              <div>{user.username}</div>
              <div>{user.email}</div>
            </div>
            <div className="drop-down-checkmark">X</div>
          </div>
          <div className="drop-down-more-options">More options
            <div className="drop-down-more-options-option" onClick={logout}>Log Out</div>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsMenu;
