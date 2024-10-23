import React from 'react';

const CustomerAccount = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-5">Account Info</h1>
      <p>Name: Ahmed</p>
      <p>Email: ahmed@gmail.com</p>
      <button className="mt-5 bg-red-500 text-white py-2 px-4 rounded">Cancel Order</button>
    </div>
  );
};

export default CustomerAccount;
