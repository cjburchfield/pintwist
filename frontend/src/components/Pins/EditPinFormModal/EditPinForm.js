import React, {useState, useEffect} from "react";
import "./EditPinForm.css";
import { useSelector, useDispatch } from "react-redux";
import { getPin, fetchPin, updatePin } from "../../../store/pins";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../../store/session";

const EditPinForm = ({onClose}) => {

    const { pinId } = useParams();
    const pin = useSelector(getPin(pinId));
    const user = useSelector(getCurrentUser)

    const dispatch = useDispatch();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pin_photo, setPinPhoto] = useState("");
    const [destination_link, setDestinationLink] = useState("");

    useEffect(() => {
        if (!pin) {
        dispatch(fetchPin(pinId));
    } else {
        setTitle(pin.title);
        setDescription(pin.description);
        setPinPhoto(pin.pin_photo);
        setDestinationLink(pin.destination_link);
    }}, [dispatch, pinId]);

    const changeTitle = (e) => {
        setTitle(e.target.value);
    };

    const changeDescription = (e) => {
        setDescription(e.target.value);
    };

    // const changePinPhoto = (e) => {
    //     setPinPhoto(e.target.value);
    // };

    const changeDestinationLink = (e) => {
        setDestinationLink(e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (!title) {
            alert("Your pin needs a title.");
            return
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

    }

    const handleDelete = (e) => {
    }



    if (!pin) {
        return null;
    }

  return (
    <>
        <form className="edit-pin-form">
            <div className="edit-pin-form-image"></div>
            <div className="edit-pin-form-header">Edit this Pin</div>
            <div className="edit-pin-form-body">
                <div className="edit-pin-title-holder">
                    <label className="edit-pin-label-text">Title
                        <input type="text" onChange={changeTitle} value={title} className="edit-pin-text-input" />
                    </label>
                </div>
                <div className="edit-pin-form-divider"></div>
                <div className="edit-pin-description-holder">
                    <label className="edit-pin-label-text">Description
                        <input type="text" onChange={changeDescription} value={description} className="edit-pin-description-input" />
                    </label>
                </div>
                <div className="edit-pin-form-divider"></div>
                <div className="edit-pin-website-holder">
                    <label className="edit-pin-label-text">Website
                        <input type="text" onChange={changeDestinationLink} value={destination_link} className="edit-pin-text-input" />
                    </label>
                </div>
            </div>
            <div className="edit-pin-form-footer">
                <div className="edit-pin-form-footer-left">
                    <button className="edit-pin-form-delete-button" onClick={handleDelete}>Delete</button>
                </div>
                <div className="edit-pin-form-footer-right">
                    <button className="edit-pin-form-cancel-button" onClick={onClose}>Cancel</button>
                    <button className="edit-pin-form-save-button" onClick={handleSave}>Save</button>
                </div>



            </div>
        </form>
    </>
  );
}

export default EditPinForm;