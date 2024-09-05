import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useGetEateryFoodItemsQuery } from "../app/services/customerApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "../Utils/CartItemsSlice";
import { useCreateOrderMutation } from "../app/services/orderApi";

export default function Etery() {
  const { customerId, eateryId } = useParams();
  const navigate = useNavigate(); // Import useNavigate hook
  const dispatch = useDispatch();

  // Initialize quantity state with an empty object
  const [quantities, setQuantities] = useState({});

  const handleIncreaseQuantity = (itemId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: {
        ...(prevQuantities[itemId] || {}),
        quantity: (prevQuantities[itemId]?.quantity || 0) + 1
      }
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: {
        ...(prevQuantities[itemId] || {}),
        quantity: Math.max((prevQuantities[itemId]?.quantity || 0) - 1, 0)
      }
    }));
  };

  const { data: foodItems, isLoading, isError } = useGetEateryFoodItemsQuery({ customerId, eateryId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !foodItems || foodItems.restaurantFoodItems.length === 0) {
    return <div>No food items available.</div>;
  }

  const handleCheckout = () => {
    // Map quantities to the format needed for cart items
    const cartItems = Object.keys(quantities)
      .filter(itemId => quantities[itemId].quantity > 0)
      .map(itemId => {
        const foodItem = foodItems.restaurantFoodItems.find(item => item.id === parseInt(itemId));
        return {
          id: foodItem.id,
          name: foodItem.name,
          description: foodItem.description,
          price: foodItem.price,
          quantity: quantities[itemId].quantity
        };
      });
    
    // Update Redux store
    dispatch(setCartItems(cartItems));
    navigate(`/${customerId}/${eateryId}/Cart`); // Navigate to the order page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded-lg">
        <ul role="list" className="divide-y divide-gray-100">
          {foodItems.restaurantFoodItems.map(fooItem => {
            const quantity = quantities[fooItem.id]?.quantity || 0;

            return (
              <li key={fooItem.id} className="relative flex justify-between py-5">
                <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
                  <img
                    alt={fooItem.name}
                    src={fooItem.imageUrl}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <a href={fooItem.href}>{fooItem.name}</a>
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {fooItem.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
                  <div className="hidden sm:block">
                    <p className="text-sm leading-6 text-gray-900">
                      Rs. {fooItem.price}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {quantity === 0 ? (
                      <button
                        onClick={() => handleIncreaseQuantity(fooItem.id)}
                        className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none"
                        aria-label="Increase quantity"
                      >
                        <span className="text-xl">+</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDecreaseQuantity(fooItem.id)}
                          className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <span className="text-xl">-</span>
                        </button>
                        <span className="mx-4 text-lg">{quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(fooItem.id)}
                          className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <span className="text-xl">+</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            View cart
          </button>
        </div>
      </div>
    </div>
  );
}
