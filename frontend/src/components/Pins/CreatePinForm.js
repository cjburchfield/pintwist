import React from "react";
import "./CreatePinForm.css";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { useState } from "react";

const CreatePinForm = () => {

    const user = useSelector(getCurrentUser)
    const userFullName = user.firstName + " " + user.lastName

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [destination_link, setDestinationLink] = useState("");
    const [pin_photo, setPinPhoto] = useState("");
    // const [imageUrl, setImageUrl] = useState("");


    //Add in redirecting to pin page upon successful save - pop up comes up saying "Saved to City" See it now link takes you to the pins page
    return (
        <>
        <h1 className="pin-test">Testing new pin</h1>
        <p>Add your title</p>
        <p>{(user.username).slice(0,1).toUpperCase()}</p>
        <p>{user.userFullName}</p>
        <p>0 followers</p>
        <p>Tell everyone what your Pin is about 😃 </p>
        <p>Add a destination link</p>
        <p>Drag and drop or click to upload</p>
        <p>Recommendation: Use high-quality .jpg files less than 20MB</p>
        </>
    )
}

export default CreatePinForm;
