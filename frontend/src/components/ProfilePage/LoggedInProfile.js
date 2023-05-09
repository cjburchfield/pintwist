import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserDetails from "./UserDetails";
import LoggedInActionButtons from "./LoggedInActionButtons";
import CreatedSavedBar from "./CreatedSavedBar";
import PinIndex from "../Pins/PinIndex";


const LoggedInProfile = () => {
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || "");
    const [showMessage, setShowMessage] = useState(false);
  
    useEffect(() => {
      if (successMessage) {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setSuccessMessage("");
        }, 4000);
      }
    }, [successMessage]);
  
    return (
      <>
        <div className="profile-container">
          <UserDetails />
          <LoggedInActionButtons />
          <CreatedSavedBar />
          {/* Display success message */}
          {showMessage && successMessage && (
          <div className="delete-success-message">{successMessage}</div>
        )}
        </div>
      </>
    );
  };
  
  export default LoggedInProfile;