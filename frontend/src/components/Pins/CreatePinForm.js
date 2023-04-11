import React from "react";
import "./CreatePinForm.css";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { useState } from "react";

const CreatePinForm = () => {

    const user = useSelector(getCurrentUser)
    const userFullName = user.firstName + " " + user.lastName

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [destination_link, setDestinationLink] = useState("");
    const [pin_photo, setPinPhoto] = useState("");
    // const [imageUrl, setImageUrl] = useState("");


    //Add in redirecting to pin page upon successful save - pop up comes up saying "Saved to Board" See it now link takes you to the pins page
    return (
        <>
        <div className="full-pin-create-page">
            <div className="full-pin-create-holder">
                <div className="pin-create-top-nav-bar"></div>
                <div className="pin-create-body-holder">
                    <div className="pin-create-body-left">
                        <div className="pin-create-media-holder">
                            <div className="pin-media-upload-holder">
                                <div className="pin-media-upload-icon">
                                    <i className="fa-solid fa-circle-arrow-up"></i> 
                                </div>
                                <div className="pin-media-upload-header">
                                    <div>Drag and drop or click to upload</div>
                                </div>
                                <div className="pin-media-upload-footer">
                                    <div>Recommendation: Use high-quality .jpg files less than 20MB</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="pin-create-body-right">
                        <div className="pin-create-body-right-upper">
                            <div className="pin-create-title">Add your title</div>
                            <div className="pin-create-div-line"></div>
                            <div className="pin-user-info-holder">
                                <div className="pin-user-profile-pic">{(user.username).slice(0,1).toUpperCase()}</div>
                                <div className="pin-user-name-and-followers">
                                    <div className="pin-create-user-name">{userFullName}</div>
                                    <div className="pin-create-user-follows">0 followers</div>
                                </div>
                            </div>
                        </div>
                        <div className="pin-create-body-right-footer">
                            {/* <div>Add a destination link</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

                <p>Tell everyone what your Pin is about 😃 </p>
        </>
    )
}


export default CreatePinForm;
