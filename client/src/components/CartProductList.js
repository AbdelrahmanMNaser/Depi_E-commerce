const CartProductList = ({ cartItems, onAdd, onRemove, onDelete }) => {
  return (
    <div className="w-full lg:w-3/4 p-4 bg-white shadow-md rounded-lg">
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between mb-4 border-b pb-4"
        >
          <img
            src={
              item.imageURLs && item.imageURLs[0]
                ? item.imageURLs[0]
                : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            }
            alt={item.title}
            className="w-20 h-20 object-cover"
          />
          <div className="flex-grow px-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <div className="flex items-center mt-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                onClick={() => onRemove(item)}
              >
                -
              </button>
              <span className="mx-4">{item.quantity}</span>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                onClick={() => onAdd(item)}
              >
                +
              </button>
              <button
                className="ml-4 p-2 text-red-500 hover:text-red-700"
                onClick={() => onDelete(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">
              {item.unitPrice * item.quantity} $
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProductList;
