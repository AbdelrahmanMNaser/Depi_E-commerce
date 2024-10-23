import React from 'react';

const AdminAccount = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl mb-5">User Management</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Omar Hany</td>
            <td className="border px-4 py-2">omarhany@gmail.com</td>
            <td className="border px-4 py-2">
              <button className="bg-red-500 text-white py-1 px-3 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminAccount;
