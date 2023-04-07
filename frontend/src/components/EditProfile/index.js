import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, fetchUser, updateUser } from "../../store/users";
import "./EditProfile.css"

const EditProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    let user = useSelector(getUser(userId));


    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

    // const [firstName, setFirstName] = useState(user.firstName)
    // const [lastName, setLastName] = useState(user.lastName);
    // const [username, setUsername] = useState(user.username);
    // const [website, setWebsite] = useState(user.website);
    // const [about, setAbout] = useState(user.about);

    // const [firstName, setFirstName] = useState(user?.firstName ?? '')
    // const [lastName, setLastName] = useState(user?.lastName ?? '');
    // const [username, setUsername] = useState(user?.username ?? '');
    // const [website, setWebsite] = useState(user?.website ?? '');
    // const [about, setAbout] = useState(user?.about ?? '');

    // const [firstName, setFirstName] = useState(user?.firstName ?? "");
    // const [lastName, setLastName] = useState(user?.lastName ?? "");
    // const [username, setUsername] = useState(user?.username ?? "");
    // const [website, setWebsite] = useState(user?.website ?? "");
    // const [about, setAbout] = useState(user?.about ?? "");
    
    // useEffect(() => {
    //     if (userId) {
    //         dispatch(fetchUser(userId));
    //     }
    // }, [dispatch, userId]);

    // if (!user) {
    //     return null;
    // }

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

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     const updatedUser = {
    //         firstName,
    //         lastName,
    //         username,
    //         website,
    //         about
    //     }
    //     updatedUser.id = userId;
    //     dispatch(updateUser(updatedUser));
    // }

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
            <div>Public profile</div>
            <div>People visiting your profile will see the following info</div>
            <label>First name
                <input type="text" onChange={changeFirstName} value={firstName} />
            </label>
            <label>Last name
                <input type="text" onChange={changeLastName} value={lastName} />
            </label>
            <label>About
                <input type="text" onChange={changeAbout} value={about} />
            </label>
            <label>Website
                <input type="text" onChange={changeWebsite} value={website} />
            </label>
            <label>Username
                <input type="text" onChange={changeUsername} value={username} />
            </label>
            <button onClick={handleClick}>Save</button>
        </form>
    )

}

export default EditProfile;
