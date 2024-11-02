import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartProductList from "../components/CartProductList";
import CartSummary from "../components/CartSummary";
import Axios from "../axiosConfig";
import {
  updateProductQuantity,
  removeProductFromCart,
  setProductDetails,
} from "../redux/slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, productDetails, status } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    navigate("/checkout");
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!cart?.productList) return;

      try {
        const productsWithDetails = await Promise.all(
          cart.productList.map(async (item) => {
            const response = await Axios.get(`/products/${item.productId}`);
            return {
              ...response.data.product,
              quantity: item.quantity,
            };
          })
        );
        dispatch(setProductDetails(productsWithDetails));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [cart, dispatch]);

  const handleAdd = (item) => {
    dispatch(
      updateProductQuantity({
        productId: item._id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleRemove = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateProductQuantity({
          productId: item._id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleDelete = (item) => {
    dispatch(removeProductFromCart(item._id));
  };

  const calculateTotal = () => {
    return (
      productDetails.reduce(
        (total, item) => total + (Number(item.unitPrice) || 0) * item.quantity,
        0
      ) || 0
    );
  };

  if (status === "loading") {
    return <div>Loading cart...</div>;
  }

  if (!productDetails.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty!</h2>
          <p className="text-gray-600">
            Browse our products and add items to your cart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row">
      <CartProductList
        cartItems={productDetails}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onDelete={handleDelete}
      />
      <CartSummary 
        totalPrice={calculateTotal()} 
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;
