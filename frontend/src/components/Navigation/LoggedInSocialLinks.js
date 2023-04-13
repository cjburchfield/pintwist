import React from "react";
import "./SocialLinks.css";

const LoggedInSocialLinks = () => {

    return (
        <>
            <div className="social-links-container">
                <div className="sl-button-container-li">
                    <div className="sl-button-circle">
                        <a href="https://www.linkedin.com/in/jamieburchfield/" target="_blank">
                    <i className="sl-button-li" class="fa-brands fa-linkedin-in" ></i>
                        </a>
                    </div>
                </div>
                <div className="sl-button-container-li">
                <div className="sl-button-circle">
                <a href="https://github.com/cjburchfield/pintwist" target="_blank">
                    <i className="sl-button-li" class="fa-brands fa-github"></i>
                    </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoggedInSocialLinks;

