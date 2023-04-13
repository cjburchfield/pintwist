import React, {useState, useEffect} from "react";
import "./EditPinForm.css";
import { useSelector, useDispatch } from "react-redux";
import { getPin, fetchPin, updatePin, deletePin } from "../../../store/pins";
import { useParams, useHistory } from "react-router-dom";
import { getCurrentUser } from "../../../store/session";
import { Modal } from '../../../context/Modal';

const DeletePinModal = ({onClose}) => {

    const { pinId } = useParams();
    const pin = useSelector(getPin(pinId));
    const user = useSelector(getCurrentUser)
    const history = useHistory();

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


    const handleDelete = () => {
          dispatch(deletePin(pin.id))
        };

    if (!pin) {
        return null;
    }

  return (
    <>
    <div className="delete-pin-header">Are you sure?</div>
    <div className="delete-pin-subheader">Once you delete a Pin, you can't undo it!</div>
    <div className="delete-pin-button-holder">
        <button className="cancel-delete-pin-button" onClick={onClose}>Cancel</button>
        <button className="delete-pin-button" onClick={handleDelete}>Delete</button>
    </div>
    </>
  );
}

export default DeletePinModal;