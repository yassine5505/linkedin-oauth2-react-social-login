import React from 'react';

const Profile = ({ profileImage, email, firstName, lastName }) => (
    <div>
        <img src={profileImage} />
        <h3>{`${firstName} ${lastName}`}</h3>
        <h3>{email}</h3>
    </div>
);

export default Profile;