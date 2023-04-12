import React, { useEffect, useState } from "react";
import "./PinShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getPin, fetchPin } from "../../store/pins";
import { getCurrentUser } from "../../store/session";
// import {EditPinForm} from "../Pins/EditPinFormModal/EditPinForm";
// import EditPinFormModal from "./EditPinFormModal/EditPinFormModal";
import EditPinForm from "./EditPinFormModal/EditPinFormModal";

const PinShowPage = () => {

    const { pinId } = useParams();
    const pin = useSelector(getPin(pinId));
    const dispatch = useDispatch();

    const user = useSelector(getCurrentUser)
    const userFullName = user.firstName + " " + user.lastName

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditPinModalOpen, setIsEditPinModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchPin(pinId))
    }, [dispatch, pinId])

    if (!pin) {
        return null;
    }

    const handleEllipsisClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleEditPinClick = () => {
        setIsDropdownOpen(false);
        setIsEditPinModalOpen(true);
    };

  return (
    <>
    <div className="pin-show-full-page">
        <div className="pin-show-full-holder">
            <div className="pin-show-left">
                <img src={pin?.pinPhoto}/>
            </div>
            <div className="pin-show-right">
                <div className="pin-show-nav-bar">
                    <div className="pin-show-nav-bar-left">
                        <div className="pin-show-nav-bar-left-ellipsis" onClick={handleEllipsisClick}>
                        <i className="fa-solid fa-ellipsis"></i>
                        </div>
                        {isDropdownOpen && (
                            <div className="pin-show-dropdown-menu">
                                <div className="pin-show-dropdown-option" onClick={handleEditPinClick}>Edit Pin</div>
                                </div>
                        )}
                    </div>
                    <div className="pin-show-nav-bar-right"></div>
                </div>
                <div className="pin-show-details-holder">
                <div className="pin-show-url">{pin.destinationLink}</div>
                <div className="pin-show-title">{pin.title}</div>
                <div className="pin-show-description">{pin.description}</div>
                <div className="pin-show-user-holder">
                    <div className="pin-show-user-picture">{(user.username).slice(0,1).toUpperCase()}</div>
                    <div className="pin-show-user-name">{userFullName}</div>
                </div>
                </div>
            </div>
        </div>
    </div>
    {isEditPinModalOpen && <EditPinForm pin={pin} onClose={() =>setIsEditPinModalOpen(false)}/>}
    </>
  );
}

export default PinShowPage;

