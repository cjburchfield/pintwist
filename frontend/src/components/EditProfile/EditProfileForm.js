import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getUser, fetchUser, updateUser } from "../../store/users";
import "./EditProfileForm.css"
import EditProfileButtons from "./EditProfileButtons";

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
    const [redirectToUserPage, setRedirectToUserPage] = useState(false);

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

        if (!username) {
          alert("Your profile needs a username.");
          return;
        }

        const updatedUser = {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          username,
          website,
          about,
        };
        dispatch(updateUser(updatedUser)).then(() => {
          setRedirectToUserPage(true)
        });
      };

      const handleReset = (e) => {
        e.preventDefault();
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUsername(user.username);
        setWebsite(user.website);
        setAbout(user.about);
      };
    
      if (!user) {
        return null;
      }

      if (redirectToUserPage) {
        return <Redirect to={`/users/${userId}`} />;
      }

    return (
        <>
        <form className="edit-profile-form">
          <div className="edit-profile-form-header-holder">
            <div className="edit-profile-form-header">Public profile</div>
            <div className="edit-profile-form-subheader">People visiting your profile will see the following info</div>
          </div>
          <div className="edit-profile-form-fields-holder">
            <div className="edit-profile-form-name-holder">
              <label className="edit-profile-form-labels-name">First name
                <input type="text" onChange={changeFirstName} value={firstName} className="edit-profile-form-inputs-name" />
              </label>
              <label className="edit-profile-form-labels-name" style={{ marginLeft: '8px'}}>Last name
                <input type="text" onChange={changeLastName} value={lastName} className="edit-profile-form-inputs-name" />
              </label>
            </div>
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
        </form>

        <EditProfileButtons 
            handleClick={handleClick}
            handleReset={handleReset}
            />
        </>
      )


      

}

export default EditProfile;
