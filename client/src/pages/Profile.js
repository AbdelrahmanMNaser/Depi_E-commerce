import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/UserSlice";
import Loading from "../components/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    
    await dispatch(updateUserProfile(userData));
    setIsEditing(false);
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                className="w-full px-3 py-2 border rounded"
                required
              />
            ) : (
              <p className="py-2">{user.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="w-full px-3 py-2 border rounded"
                required
              />
            ) : (
              <p className="py-2">{user.email}</p>
            )}
          </div>
          {isEditing && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password (optional)
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;