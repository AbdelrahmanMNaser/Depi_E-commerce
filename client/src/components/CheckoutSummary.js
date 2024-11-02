import React from 'react'

function CheckoutSummary({ productDetails, cartTotal }) {
  return (
    <div className="w-full md:w-96 bg-white p-6 shadow-lg rounded-lg h-fit">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
    <div className="space-y-3">
      {productDetails?.map((item) => (
        <div key={item._id} className="flex justify-between py-2 border-b">
          <div>
            <span className="font-medium">{item.title}</span>
            <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
          </div>
          <span>${((item.unitPrice || 0) * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="flex justify-between pt-4 font-semibold text-lg">
        <span>Total</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
    </div>
  </div>
  )
}

export default CheckoutSummary
