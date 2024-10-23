import React from 'react';

const CartProductList = ({ cartItems, onAdd, onRemove }) => {
  return (
    <div className="w-full lg:w-3/4 p-4 bg-white shadow-md rounded-lg">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
          <div className="flex-grow px-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <div className="flex items-center mt-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => onRemove(item)}
              >
                -
              </button>
              <span className="mx-4">{item.quantity}</span>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md"
                onClick={() => onAdd(item)}
              >
                +
              </button>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">{item.price * item.quantity} $</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProductList;
