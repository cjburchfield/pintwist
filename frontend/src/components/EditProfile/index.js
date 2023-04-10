import React, { useState, useEffect } from 'react';
import EditProfileForm from './EditProfileForm';
import EditFormSideBar from './EditSideBar';
import './EditProfile.css';

const EditProfile = () => {

  return (
    <>
    <div className="edit-full-holder">
        <EditFormSideBar />
        <EditProfileForm />
      </div>
    </>
  );
}

export default EditProfile;
