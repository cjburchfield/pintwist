import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { createPin } from "../../store/pins";
import "./CreatePinForm.css";
import { useHistory } from "react-router-dom";

const CreatePinForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(getCurrentUser);
  const user_id = user.id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination_link, setDestinationLink] = useState("");
  const [pin_photo, setPinPhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   if (submitted) {
  //     if (successMessage) {
  //       setShowMessage(true);
  //       history.push({
  //         pathname: "/home",
  //         state: { successMessage: "Pin created successfully!" },
  //       });
  //       setShowMessage(false);
  //       setSuccessMessage("");
  //     } else if (errorMessage) {
  //       setShowMessage(true);
  //       setTimeout(() => {
  //         setShowMessage(false);
  //         setErrorMessage("");
  //       }, 5000);
  //     }
  //     setSubmitted(false);
  //   }
  // }, [submitted, successMessage, errorMessage, history]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await dispatch(
  //       createPin({
  //         title,
  //         description,
  //         destination_link,
  //         pin_photo,
  //         user_id,
  //       })
  //     );
  //     setSuccessMessage("Pin created successfully!");
  //     setErrorMessage("");
  //   } catch (error) {
  //     setErrorMessage("Error creating pin. Please try again.");
  //     setSuccessMessage("");
  //   } finally {
  //     setSubmitted(true);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdPinId = await dispatch(createPin({
        title,
        description,
        destination_link,
        pin_photo,
        user_id
      }));
      setSuccessMessage("Pin created successfully!");
      setErrorMessage("");
      history.push({
        pathname: `/pin/${createdPinId}`,
        state: { successMessage: "Pin created successfully!" },
      });
    } catch (error) {
      setErrorMessage("Error creating pin. Please try again.");
      setSuccessMessage("");
    } finally {
      setSubmitted(true);
    }
  };
  
  

  const preview = pin_photo ? URL.createObjectURL(pin_photo) : null;

return (
  <>
    {showMessage && successMessage && (
      <div className="create-success-message">{successMessage}</div>
    )}
    {showMessage && errorMessage && (
      <div className="create-error-message">{errorMessage}</div>
    )}
    <form onSubmit={handleSubmit}>
      <div className="full-pin-create-page">
        <div className="full-pin-create-holder">
          <div className="pin-create-nav-header">
            <div className="pin-create-ellisis"></div>
            <div className="pin-create-save-holder">
              <div className="pin-create-board-holder"></div>
              <button className="pin-create-save-button" type="submit">
                Save
              </button>
            </div>
          </div>
          <div className="pin-create-top-nav-bar"></div>
          <div className="pin-create-body-holder">
            <div className="pin-create-body-left">
              <div className="pin-create-media-holder">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="pin-media-preview"
                  />
                ) : (
                  <div className="pin-media-upload-holder">
                    <div
                      className="pin-media-upload-icon"
                      onClick={() =>
                        document.getElementById("pin_photo").click()
                      }
                    >
                      <div className="pin-media-upload-circle">
                        <i className="fa-solid fa-circle-arrow-up"></i>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="pin_photo"
                      name="pin_photo"
                      onChange={(e) => setPinPhoto(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    <div className="pin-media-upload-header">
                      Click to upload
                    </div>
                    <div className="pin-media-upload-footer">
                      Recommendation: Use high-quality .jpg files less than 20MB
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pin-create-body-right">
              <div className="pin-create-body-right-upper">
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
                  <div className="pin-user-profile-pic">
                    {user.username.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="pin-user-name-and-followers">
                    <div className="pin-create-user-name">{user.username}</div>
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
                    placeholder="Tell everyone what your Pin is about 😃"
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
    </form>
</>
    )
}

export default CreatePinForm;


