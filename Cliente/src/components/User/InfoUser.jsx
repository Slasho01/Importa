// src/components/EditProfile/EditProfile.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoById } from '../../redux/actions';
import axios from 'axios';

const EditProfile = () => {
    const dispatch = useDispatch()
    const userinfo = useSelector(state => state.userInfo);
    useEffect(() => {
        dispatch(getUserInfoById()); // Fetch all clients for reference
      }, [dispatch]);

    return (
        <div>
    
        </div>
    );
};

export default EditProfile;
