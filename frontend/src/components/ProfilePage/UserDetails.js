import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, fetchUser} from "../../store/users"
import "./UserDetails.css"

const UserDetails = () => {

    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId))

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])

    
    if (!user) {
        return null;
    }

    const userFullName = user.firstName + " " + user.lastName


    // return (
    //     <>
    //     <div className="user-details-section">
    //         <div className="profile-page-picture-holder">
    //             <div className="profile-page-picture">{ (user.username).slice(0,1).toUpperCase() } </div>
    //         </div>
    //         <div className="profile-page-names-holder">
    //             <div className="profile-page-full-name">{ userFullName }</div>
    //             <div className ="profile-page-username">@{ user.username }</div>
    //         </div>
    //         <div className="profile-page-about-holder">
    //             <a className ="profile-page-website" href="https://www.linkedin.com/in/jamieburchfield/">Website</a>
    //             <div className ="profile-page-about">{ user.about }</div>
    //         </div>
    //         <div className="profile-page-followers-holder">
    //             <div className="profile-page-followers">0 followers</div>
    //             <div className="profile-page-follower-divider">.</div>
    //             <div className="profile-page-followings">0 following</div>
    //         </div>
    //     </div>
    //     </>
    // )
    return (
        <>
          <div className="user-details-section">
            <div className="profile-page-picture-holder">
              <div className="profile-page-picture">{user.username.slice(0,1).toUpperCase()}</div>
            </div>
            <div className="profile-page-names-holder">
              <div className="profile-page-full-name">{userFullName}</div>
              <div className="profile-page-username">@{user.username}</div>
            </div>
            <div className="profile-page-about-holder">
                <a className ="profile-page-website" href="https://www.linkedin.com/in/jamieburchfield/">Website</a>
                <div className="profile-page-follower-divider">.</div>
                <div className ="profile-page-about">{ user.about }</div>
            </div>
            <div className="profile-page-followers-holder">
              <div className="profile-page-followers">0 followers</div>
              <div className="profile-page-follower-divider">.</div>
              <div className="profile-page-followings">0 following</div>
            </div>
          </div>
        </>
      );
      
}

export default UserDetails



