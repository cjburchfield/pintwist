import React, {useState, useEffect} from "react";
import "./EditPinForm.css";
import { useSelector, useDispatch } from "react-redux";
import { getPin, fetchPin, fetchAllPins, updatePin, deletePin } from "../../../store/pins";
import { useParams, useHistory } from "react-router-dom";
import { getCurrentUser } from "../../../store/session";
// import DeletePinModal from "./DeletePinModal";

const EditPinForm = ({onClose}) => {

    const { pinId } = useParams();
    const pin = useSelector(getPin(pinId));
    const user = useSelector(getCurrentUser);
    const history = useHistory();

    const dispatch = useDispatch();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pin_photo, setPinPhoto] = useState("");
    const [destination_link, setDestinationLink] = useState(pin?.destinationLink || '');

    // const [showDeleteModal, setShowDeleteModal] = useState(false);

    // const handleDelete = () => {
    // //   setShowDeleteModal(true);
    // dispatch(deletePin(pin.id)).then(history.push("/home"))
    // };

    
  
    // const handleCloseDeleteModal = () => {
    //   setShowDeleteModal(false);
    // };

//     const handleDelete = () => {
//     dispatch(deletePin(pin.id)).then(() => {
//         dispatch(fetchAllPins());
//         history.push("/home");
//     });
// };

const handleDelete = () => {
    dispatch(deletePin(pin.id)).then(dispatch(fetchAllPins())).then(history.push("/home"));
}



    useEffect(() => {
        if (!pin) {
        dispatch(fetchPin(pinId));
    } else {
        setTitle(pin.title);
        setDescription(pin.description);
        setPinPhoto(pin.pin_photo);
        setDestinationLink(pin.destination_link);
    }}, [dispatch, pinId, pin]);

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

    if (!pin) {
        return null;
    }

  return (
    <>
    <div id="testing-edit">
        <form id="edit-pin-modal-bg">
            <div className="edit-pin-form-header">Edit this Pin</div>
            <div className="edit-pin-form-body">
                <div className="edit-pin-form-content">
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Title
                        <input type="text" onChange={changeTitle} value={title} className="modal-input" />
                    </label>
                </div>
                <div className="edit-pin-form-divider"></div>
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Description
                        <input type="text" onChange={changeDescription} value={description} className="modal-input" />
                    </label>
                </div>
                <div className="edit-pin-form-divider"></div>
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Website
                        <input type="text" onChange={changeDestinationLink} value={destination_link} className="modal-input" />
                    </label>
                </div>
                </div>
                <div className="edit-pin-form-image-holder">
                    <img src={pin?.pinPhoto} className="edit-pin-form-image"/>
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
        {/* {showDeleteModal && <DeletePinModal onClose={handleCloseDeleteModal} />} */}
        </div>
    </>
  );
}

export default EditPinForm;