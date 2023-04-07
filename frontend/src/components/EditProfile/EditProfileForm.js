import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, fetchUser, updateUser } from "../../store/users";
import "./EditProfileForm.css"

const EditProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    let user = useSelector(getUser(userId));


    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [username, setUsername] = useState(user ? user.username : '');
    const [website, setWebsite] = useState(user ? user.website : '');
    const [about, setAbout] = useState(user ? user.about : '');

useEffect(() => {
  if (!user) {
    dispatch(fetchUser(userId));
  } else {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setWebsite(user.website);
    setAbout(user.about);
  }
}, [dispatch, userId, user]);

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const changeLastName = (e) => {
        setLastName(e.target.value);
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changeWebsite = (e) => {
        setWebsite(e.target.value);
    }

    const changeAbout = (e) => {
        setAbout(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        const updatedUser = {
          id: userId,
          firstName,
          lastName,
          username,
          website,
          about,
        };
        dispatch(updateUser(updatedUser));
      };
    
      if (!user) {
        return null;
      }

    return (
        <form className="edit-profile-form">
            <div className="edit-profile-form-header-holder">
                <div className="edit-profile-form-header">Public profile</div>
                <div className="edit-profile-form-subheader">People visiting your profile will see the following info</div>
            </div>
            <div className="edit-profile-form-fields-holder">
                <label className="edit-profile-form-labels-name">First name
                    <input type="text" onChange={changeFirstName} value={firstName} className="edit-profile-form-inputs-name" />
                </label>
                <label className="edit-profile-form-labels">Last name
                    <input type="text" onChange={changeLastName} value={lastName} className="edit-profile-form-inputs"/>
                </label>
                <label className="edit-profile-form-labels">About
                    <input type="text" onChange={changeAbout} value={about} className="edit-profile-form-inputs"/>
                </label>
                <label className="edit-profile-form-labels">Website
                    <input type="text" onChange={changeWebsite} value={website} className="edit-profile-form-inputs"/>
                </label>
                <label className="edit-profile-form-labels">Username
                    <input type="text" onChange={changeUsername} value={username} className="edit-profile-form-inputs"/>
                </label>
            </div>
            <button className="edit-form-form-submit-button" onClick={handleClick}>Save</button>
        </form>
    )

}

export default EditProfile;
