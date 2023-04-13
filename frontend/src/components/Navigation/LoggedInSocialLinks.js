import React from "react";
import "./SocialLinks.css";

const LoggedInSocialLinks = () => {
    return (
        <>
            <div className="social-links-container">
                <div className="linkedin-button">
                    <i class="fa-brands fa-linkedin-in"></i>
                </div>
                <div className="github-button">
                    <i class="fa-brands fa-github"></i>
                </div>
            </div>
        </>
    )
}

export default LoggedInSocialLinks;