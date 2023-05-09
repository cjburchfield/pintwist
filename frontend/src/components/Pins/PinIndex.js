import React, { useEffect, useState } from "react";
import "./PinIndex.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPins, getPins } from "../../store/pins";
import { Link, useLocation } from "react-router-dom";

const PinIndex = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || "");
    const [showMessage, setShowMessage] = useState(false);


    useEffect(() => {
        dispatch(fetchAllPins());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setSuccessMessage("");
            }, 4000);
        }
    }, [successMessage]);

    const pins = useSelector(getPins);

    return (
        <div id="pins-home-page">
                    {showMessage && successMessage && <div className="success-message">{successMessage}</div>}
            <div id="pins-holder">
                {pins.map((pin) => 
                    <div className="pin-index-item" key={`${pin.id}-${Date.now()}`}>
                        <Link to={`/pin/${pin.id}`}>
                            <img 
                                className="pin-index-item-image"
                                src={pin?.pinPhoto}
                            />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
} 

export default PinIndex;