import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/20/solid';
import { useParams, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../app/services/orderApi';

const Cart = () => {
  const { eateryId } = useParams(); // Extract parameters from URL
  console.log("mintu eatery",eateryId);
  const navigate = useNavigate();
  
  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cartItems);
  
  const token = JSON.parse(localStorage.getItem('token'));
  let customerId = null;
  if (token){
    customerId = token.id;

  }
  
  // If cart items are not available in Redux, fallback to local storage
  const localStorageCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Combine cart items from Redux store and local storage
  const [items, setItems] = useState(cartItems.length > 0 ? cartItems : localStorageCartItems);

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 5.00; // Fixed shipping cost
  const taxes = subtotal * 0.082; // Example tax rate
  const total = subtotal + shipping + taxes;

  const handleIncreaseQuantity = (itemId) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const handleDecreaseQuantity = (itemId) => {
    setItems(prevItems => {
      return prevItems.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const handleRemoveItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    // Save updated items to local storage when items change
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();

  const handleConfirmOrder = async () => {
    // Prepare data for API request
    const foodItems = items.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));


    console.log("food Items",foodItems);
    try {
      const response = await createOrder({customerId,data:{eateryId:eateryId,foodItems:foodItems}}
        
      ).unwrap();

      if (response) {
        console.log('Order confirmed:', response);
        // Optionally navigate to a success page or show a success message
        navigate(`/neworder/${response.orderId}`);
      } else {
        console.error('Order confirmation failed:', response.statusText);
        // Optionally show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally show an error message
    }
  };

  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {items.map(item => (
            <li key={item.id} className="flex px-4 py-6 sm:px-6">
              <div className="flex-shrink-0">
                <img alt={item.imageAlt} src={item.imageSrc} className="w-20 rounded-md" />
              </div>

              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <a href={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                        {item.name}
                      </a>
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove</span>
                      <TrashIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 items-end justify-between pt-2">
                  <p className="mt-1 text-sm font-medium text-gray-900">{`Rs. ${item.price.toFixed(2)}`}</p>

                  <div className="ml-4 flex items-center">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none"
                      aria-label="Decrease quantity"
                    >
                      <span className="text-xl">-</span>
                    </button>
                    <span className="mx-4 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none"
                      aria-label="Increase quantity"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">{`Rs. ${subtotal.toFixed(2)}`}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Shipping</dt>
            <dd className="text-sm font-medium text-gray-900">{`Rs. ${shipping.toFixed(2)}`}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Taxes</dt>
            <dd className="text-sm font-medium text-gray-900">{`Rs. ${taxes.toFixed(2)}`}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-gray-900">{`Rs. ${total.toFixed(2)}`}</dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="button"
            onClick={handleConfirmOrder}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
