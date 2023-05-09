import React, { useState, useRef, useEffect } from "react";
import "./CreateActions.css";
import { useHistory } from "react-router-dom";
import CreateBoardForm from "../CreateBoardModal/CreateBoardForm";


const CreateActions = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
    const dropdownRef = useRef();
    const ellipsisRef = useRef();
    const history = useHistory();

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
        document.addEventListener("mousedown", handleClickOutsideDropdown);
        return () => {
          document.removeEventListener("mousedown", handleClickOutsideDropdown);
        };
      }, [isDropdownOpen]);

      const handlePlusClick = (event) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
      };

      const handlePinClick = () => {
        setIsDropdownOpen(false);
        history.push("/pin-builder");
      }

      const handleBoardClick = () => {
        setIsDropdownOpen(false);
        setIsCreateBoardModalOpen(true);
      };




    return (
        <>
            <div className="create-actions-container">
                <div className="plus-sign-holder">
                    <div
                  ref={ellipsisRef}
                  className={`plus-sign-holder ${isDropdownOpen ? 'plus-sign-holder-active' : ''}`}
                  onClick={handlePlusClick}
                >
                  <i className="fa-solid fa-plus"></i>
                </div>
                {isDropdownOpen && (
                  <div ref={dropdownRef} className="create-actions-dropdown-menu">
                    
                    <div className="create-actions-dropdown-header">Create</div>
                    <div
                      className="create-actions-dropdown-option"
                      onClick={handlePinClick}
                    >
                      Pin
                    </div>
                    <div
                      className="create-actions-dropdown-option"
                      onClick={handleBoardClick}
                    >
                      Board
                    </div>
                  </div>
                )}
                </div>
            </div>
            {isCreateBoardModalOpen && (
        <CreateBoardForm onClose={() => setIsCreateBoardModalOpen(false)} />
      )}
        </>
    )
}

export default CreateActions;