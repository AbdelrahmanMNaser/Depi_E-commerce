import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "./../redux/slices/UserSlice";
import Loading from "./../components/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    password: "",
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      dispatch(updateUserProfile(formData));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <button
          className={`block w-full text-left px-4 py-2 mb-2 ${
            activeTab === "info" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Info
        </button>
        <button
          className={`block w-full text-left px-4 py-2 ${
            activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Password
        </button>
      </div>
      <div className="w-3/4 p-4">
        {activeTab === "info" && (
          <div>
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            {isEditing ? (
              <div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Role:</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2"
                  onClick={handleEditToggle}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg mb-2">Name: {user.name}</p>
                <p className="text-lg mb-2">Email: {user.email}</p>
                <p className="text-lg">Role: {user.role}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-4"
                  onClick={handleEditToggle}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        )}
        {activeTab === "password" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="mb-4">
              <label className="block text-lg mb-2">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={() => alert("Password updated")}
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
