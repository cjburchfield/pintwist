import React, {useState, useEffect} from "react";
import "./EditPinForm.css";
import { useSelector, useDispatch } from "react-redux";
import { getPin, fetchPin, fetchAllPins, updatePin, deletePin } from "../../../store/pins";
import { useParams, useHistory } from "react-router-dom";
import { getCurrentUser } from "../../../store/session";

const EditPinForm = ({onClose}) => {

    const { pinId } = useParams();
    const pin = useSelector(getPin(pinId));
    const user = useSelector(getCurrentUser);
    const history = useHistory();

    const dispatch = useDispatch();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pin_photo, setPinPhoto] = useState(pin?.pin_photo || "");
    const [destination_link, setDestinationLink] = useState(pin?.destinationLink || "");

    const [titleErrorMessage, setTitleErrorMessage] = useState(""); 
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(""); 

  
const handleDelete = () => {
    dispatch(deletePin(pin.id))
      .then(dispatch(fetchAllPins()))
      .then(() => {
        history.push({
          pathname: `/users/${user.id}`,
          state: { successMessage: "Pin deleted successfully!" },
        });
      });
  };
  
  


    useEffect(() => {
        if (!pin) {
        dispatch(fetchPin(pinId));
    } else {
        setTitle(pin.title);
        setDescription(pin.description);
        setPinPhoto(pin.pin_photo);
        setDestinationLink(pin.destinationLink);
    }}, [dispatch, pinId, pin]);

    const changeTitle = (e) => {
        setTitle(e.target.value);
    };

    const changeDescription = (e) => {
        setDescription(e.target.value);
    };

    const changeDestinationLink = (e) => {
        setDestinationLink(e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();
      
        if (title.length > 25) {
          setTitleErrorMessage("Title cannot exceed 25 characters.");
          return;
        } else {
          setTitleErrorMessage("");
        }
      
        if (description.length > 200) {
          setDescriptionErrorMessage("Description cannot exceed 200 characters.");
          return;
        } else {
          setDescriptionErrorMessage("");
        }
      
        if (!title) {
          alert("Your pin needs a title.");
          return;
        }
      
        if (!pin) {
          alert("The pin no longer exists.");
          return;
        }
      
        const updatedPin = {
          id: pinId,
          user_id: user.id,
          title,
          description,
          destination_link,
          pin_photo
        };
      
        dispatch(updatePin(updatedPin)).then(() => dispatch(fetchPin(pinId))).then(onClose);
      };
      
        

    if (!pin) {
        return null;
    }

  return (
    <>
    <div id="testing-edit">
    <form id="edit-pin-modal-bg" onSubmit={handleSave}>
            <div className="edit-pin-form-header">Edit this Pin</div>
            <div className="edit-pin-form-body">
                <div className="edit-pin-form-content">
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Title
                        <input type="text" onChange={changeTitle} value={title} className="modal-input" />
                    </label>
                    {titleErrorMessage && <div className="error-message">{titleErrorMessage}</div>}

                </div>
                <div className="edit-pin-form-divider"></div>
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Description
                        <input type="text" onChange={changeDescription} value={description} className="modal-input" />
                    </label>
                    {descriptionErrorMessage && <div className="error-message">{descriptionErrorMessage}</div>}

                </div>
                <div className="edit-pin-form-divider"></div>
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Website
                        <input type="text" onChange={changeDestinationLink} value={destination_link} className="modal-input" />
                    </label>
                </div>
                </div>
                <div className="edit-pin-form-image-holder">
                <img src={pin?.pin_photo} className="edit-pin-form-image"/>
                </div>
            </div>
            <div className="edit-pin-form-footer">
                <div className="edit-pin-form-footer-left">
                <button className="edit-pin-form-delete-button" onClick={handleDelete}>Delete</button>
                </div>
                <div className="edit-pin-form-footer-right">
                    <button className="edit-pin-form-cancel-button" onClick={onClose}>Cancel</button>
                    <button className="edit-pin-form-save-button" type="submit">Save</button>
                </div>  



            </div>
        </form>
        </div>
    </>
  );
}

export default EditPinForm;