import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getUser, fetchUser, updateUser } from "../../store/users";
import { updateSession} from "../../store/session";
import "./EditProfileForm.css"
import EditProfileButtons from "./EditProfileButtons";



const EditProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    let user = useSelector(getUser(userId));

    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectToUserPage, setRedirectToUserPage] = useState(false);
    const [showMessage, setShowMessage] = useState(false); 


useEffect(() => {
  if (!user) {
    dispatch(fetchUser(userId));
  } else {
    setUsername(user.username);
    setWebsite(user.website);
    setAbout(user.about);
  }
}, [dispatch, userId, user]);

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
          username,
          website,
          about,
        };
        dispatch(updateUser(updatedUser))
        .then(() => {
          setShowMessage(true);
          dispatch(updateSession(updatedUser));
  
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage("There was an error saving your changes.");
        });
    };


      const handleReset = (e) => {
        e.preventDefault();
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
            <label className="edit-profile-form-labels">Username
            <input type="text" onChange={changeUsername} value={username} maxLength={20} className="edit-profile-form-inputs" />
            </label>
            <label className="edit-profile-form-labels">About
              <input type="text" onChange={changeAbout} value={about} maxLength={100} className="edit-profile-form-inputs"/>
            </label>
            <label className="edit-profile-form-labels">Website
              <input type="text" onChange={changeWebsite} value={website} maxLength={50} className="edit-profile-form-inputs"/>
            </label>
          </div>
          {showMessage && <div className="profile-success-message">Profile saved!</div>} 
        </form>

        <EditProfileButtons 
            handleClick={handleClick}
            handleReset={handleReset}
            />
        </>
      )


      

}

export default EditProfile;
