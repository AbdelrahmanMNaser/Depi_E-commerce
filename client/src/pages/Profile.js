import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="text-lg mb-2">Name: {user.name}</p>
      <p className="text-lg">Role: {user.role}</p>
    </div>
  );
};

export default Profile;