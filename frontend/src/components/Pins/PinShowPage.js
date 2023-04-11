import React, { useEffect } from "react";
import "./PinShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getPin, fetchPin } from "../../store/pins";
import { getCurrentUser } from "../../store/session";

const PinShowPage = () => {

    const { pinId } = useParams();
    const pin = useSelector(getPin(pinId));
    const dispatch = useDispatch();

    const user = useSelector(getCurrentUser)
    const userFullName = user.firstName + " " + user.lastName

    useEffect(() => {
        dispatch(fetchPin(pinId))
    }, [dispatch, pinId])

    if (!pin) {
        return null;
    }

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
                        <div className="pin-show-nav-bar-left-ellipsis">...</div>
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
    </>
  );
}

export default PinShowPage;

