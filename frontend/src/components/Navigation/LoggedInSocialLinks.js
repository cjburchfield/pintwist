import React from "react";
import "./SocialLinks.css";

const LoggedInSocialLinks = () => {

    return (
        <>
            <div className="social-links-container">
                <div className="sl-button-container-li">
                    <div className="sl-button-circle-li">
                        <a href="https://www.linkedin.com/in/jamieburchfield/" target="_blank">
                        <div className="sl-button-li">
                    <i className="fa-brands fa-linkedin-in" ></i>
                        </div>
                        </a>
                    </div>
                </div>
                <div className="sl-button-container-li">
                <div className="sl-button-circle-li">
                <a href="https://github.com/cjburchfield/pintwist" target="_blank">
                <div className="sl-button-li">
                    <i className="fa-brands fa-github"></i>
                    </div>
                    </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoggedInSocialLinks;

