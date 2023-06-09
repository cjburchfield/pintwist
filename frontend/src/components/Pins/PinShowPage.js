import React, { useEffect, useState, useRef } from "react";
import "./PinShowPage.css";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPin, fetchPin } from "../../store/pins";
import { getUser } from "../../store/users";
import { fetchUser } from "../../store/users";
import EditPinFormModal from "./EditPinFormModal";
import AddPinToBoard from "../Boards/AddPinToBoard/AddPinToBoard";

const PinShowPage = () => {
  const { pinId } = useParams();
  const pin = useSelector(getPin(pinId));
  const dispatch = useDispatch();
  const location = useLocation();
  const successMessage = location.state ? location.state.successMessage : null;
  const [showMessage, setShowMessage] = useState(false);
  const pinCreatorID = pin ? pin.userId : null;

  useEffect(() => {
      dispatch(fetchUser(pinCreatorID));
    }, [dispatch, pinCreatorID]);
  
  const user = useSelector(getUser(pinCreatorID));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditPinModalOpen, setIsEditPinModalOpen] = useState(false);

  const dropdownRef = useRef();
  const ellipsisRef = useRef();

  const handleClickOutsideDropdown = (event) => {
    if (
      isDropdownOpen &&
      !dropdownRef.current.contains(event.target) &&
      !ellipsisRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    dispatch(fetchPin(pinId));
  }, [dispatch, pinId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (successMessage) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [successMessage]);

  if (!pin || !user || !pinCreatorID) {
    return null;
  }

  const handleEllipsisClick = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditPinClick = () => {
    setIsDropdownOpen(false);
    setIsEditPinModalOpen(true);
  };

  return (
    <>
{showMessage && successMessage && <div className="create-success-message">{successMessage}</div>}
      <div className="pin-show-full-page">
        <div className="pin-show-full-holder">
          <div className="pin-show-left">
            <img src={pin?.pinPhoto} />
          </div>
          <div className="pin-show-right">
            <div className="pin-show-nav-bar">
              <div className="pin-show-nav-bar-left">
                <div
                  ref={ellipsisRef}
                  className={`pin-show-nav-bar-left-ellipsis ${isDropdownOpen ? 'pin-show-nav-bar-left-ellipsis-active' : ''}`}
                  onClick={handleEllipsisClick}
                >
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
                {isDropdownOpen && (
                  <div ref={dropdownRef} className="pin-show-dropdown-menu">
                    <div
                      className="pin-show-dropdown-option"
                      onClick={handleEditPinClick}
                    >
                      Edit Pin
                    </div>
                  </div>
                )}
              </div>
              <div className="pin-show-nav-bar-right">
                <AddPinToBoard pinId={pin.id} />

              </div>
            </div>
            <div className="pin-show-details-holder">
              <a
                href="https://www.linkedin.com/in/jamieburchfield/"
                target="_blank"
              >
                <div className="pin-show-url">{pin.destinationLink}</div>
              </a>


              <div className="pin-show-title">{pin.title}</div>
              <div className="pin-show-description">{pin.description}</div>
              <div className="pin-show-user-holder">
                <div className="pin-show-user-picture">
                  {(user.username).slice(0, 1).toUpperCase()}
                </div>
                <div className="pin-show-user-name">{user.username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditPinModalOpen && (
        <EditPinFormModal pin={pin} onClose={() => setIsEditPinModalOpen(false)} />
      )}
    </>
  );
};

export default PinShowPage;