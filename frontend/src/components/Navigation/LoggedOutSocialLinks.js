import React from "react";
import "./SocialLinks.css";

const LoggedOutSocialLinks = () => {
    return (
        <>
            <div className="social-links-container">
                <div className="sl-button-container-lo">
                    <div className="sl-button-circle-lo">
                    <a href="https://www.linkedin.com/in/jamieburchfield/" target="_blank">
                        <div className="sl-button-lo">
                    <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                    </a>
                    </div>
                </div>
                <div className="sl-button-container-lo">
                <div className="sl-button-circle-lo">
                <a href="https://github.com/cjburchfield/pintwist" target="_blank">
                <div className="sl-button-lo">

                    <i className="fa-brands fa-github"></i>
                    </div>
                    </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoggedOutSocialLinks;