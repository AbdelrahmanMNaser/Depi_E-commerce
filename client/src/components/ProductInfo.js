import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/20/solid";
import { addProductToCart, createCart } from "../redux/slices/CartSlice"; // Adjust the path as needed
import ProductImageGallery from "./ProductImageGallery"; // Import the new component

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleAddToCart = () => {
    if (cart) {
      console.log("Adding product to existing cart:", {
        productId: product._id,
        quantity,
      });
      dispatch(addProductToCart({ productId: product._id, quantity }));
    } else {
      console.log("Creating new cart with product:", {
        products: [{ productId: product._id, quantity }],
      });
      dispatch(
        createCart({ productList: [{ productId: product._id, quantity }] })
      );
    }
  };

  return (
    <div className="top-0 inset-x-0 flex items-start justify-center mt-4">
      <div className="flex w-full max-w-6xl justify-center">
        <ProductImageGallery imageURLs={product.imageURLs} title={product.title} />
        <div className="flex flex-col justify-center p-4 w-1/2 mx-auto">
          <h2 className="text-4xl font-bold text-gray-900">{product.title}</h2>
          <section aria-labelledby="information-heading" className="mt-2">
            <h3 id="information-heading" className="sr-only">
              Product information
            </h3>
            <p className="text-2xl text-gray-900">{product.unitPrice}</p>
            <div className="mt-4">
              <p className="text-gray-500">{product.description}</p>
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          <div className="mt-6">
            <label htmlFor="quantity" className="sr-only">
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 text-center border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full justify-center rounded-md border border-gray-300 px-2 py-3 hover:border-black focus:ring-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;