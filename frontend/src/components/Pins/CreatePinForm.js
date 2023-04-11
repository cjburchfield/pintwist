import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { createPin } from "../../store/pins";
import "./CreatePinForm.css";

const CreatePinForm = () => {
    const user = useSelector(getCurrentUser)
    const userFullName = user.firstName + " " + user.lastName

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [destination_link, setDestinationLink] = useState("");
    const [pin_photo, setPinPhoto] = useState(null);

    // const handleFileChange = (e) => {
    //     setPinPhoto(e.target.files[0]);
    //   };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPin({ title, description, destination_link }));
    };




    //         {/* <div>
    //           <label htmlFor="pin_photo">Pin Photo:</label>
    //           <input
    //             type="file"
    //             id="pin_photo"
    //             name="pin_photo"
    //             onChange={handleFileChange}
    //           />
    //         </div> */}
    //         <button type="submit">Create Pin</button>
    //       </form>
    //     </div>
    //   );
    

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="full-pin-create-page">
            <div className="full-pin-create-holder">
                <div className="pin-create-nav-header">
                    <div className="pin-create-ellisis">...</div>
                    <div className="pin-create-save-holder">
                        <div className="pin-create-board-holder">
                            <div className="pin-create-board-text">Board Coming!</div>
                        </div>
                        <button className="pin-create-save-button" type="submit">Save</button>
                    </div>
                </div>





                <div className="pin-create-top-nav-bar"></div>
                <div className="pin-create-body-holder">
                    <div className="pin-create-body-left">
                        <div className="pin-create-media-holder">
                            <div className="pin-media-upload-holder">
                                <div className="pin-media-upload-icon">
                                    <i className="fa-solid fa-circle-arrow-up"></i> 
                                </div>
                                <div className="pin-media-upload-header">
                                    <div>Click to upload</div>
                                </div>
                                <div className="pin-media-upload-footer">
                                    <div>Recommendation: Use high-quality .jpg files less than 20MB</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="pin-create-body-right">
                        <div className="pin-create-body-right-upper">
                            {/* <div className="pin-create-title">Add your title</div> */}
                            <div>
                                <label htmlFor="title"></label>
                                <input
                                    className="pin-create-title-input"
                                    type="text"
                                    id="title"
                                    placeholder="Add your title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="pin-create-div-line"></div>
                            <div className="pin-user-info-holder">
                                <div className="pin-user-profile-pic">{(user.username).slice(0,1).toUpperCase()}</div>
                                <div className="pin-user-name-and-followers">
                                    <div className="pin-create-user-name">{userFullName}</div>
                                    {/* <div className="pin-create-user-follows">0 followers</div> */}
                                </div>
                            </div>                                
                                <div>
                                    <label htmlFor="description"></label>
                                    <textarea
                                        id="description"
                                        className="pin-description-holder"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Tell everyone what your Pin is about                                      😃 "
                                    ></textarea>
                                </div>
                                
                                
                                
                                <div className="pin-create-div-line"></div>
                        </div>
                        <div>
                            <label htmlFor="destination_link"></label>
                            <input
                                type="text"
                                id="destination_link"
                                name="destination_link"
                                placeholder="Add a destination link"
                                className="pin-create-body-right-footer"
                                value={destination_link}
                                onChange={(e) => setDestinationLink(e.target.value)}
                            />
                        </div>
                        <div className="pin-create-div-line"></div>
                    </div>
                </div>
            </div>
        </div>
        {/* <button type="submit">Save</button> */}
        </form>
        </>
    )
}

export default CreatePinForm;


