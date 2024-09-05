import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../app/services/orderApi';



export default function OrderSummary() {
  const { orderId } = useParams(); // Extract orderId from URL
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem('token'));
  let customerId = null;
  if (token){
    customerId = token.id;

  }
  // Fetch order details using the orderId
  const { data: order, isLoading, error } = useGetOrderQuery({ customerId, orderId });

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Destructure the order data
  const { id, customer_id, status, created_at, foodItems } = order.order || {};

  // Calculate subtotal, delivery, taxes, and total
  const subtotal = foodItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = 20; // Fixed delivery cost
  const taxes = 10; // Fixed taxes
  const total = subtotal + delivery + taxes;


  const handleDashboard =() => {
    navigate(`/Dashboard/${customer_id}`)
  };

  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            alt="Order Confirmation"
            src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">Payment successful</h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering</p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation
                very soon!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Order ID</dt>
                <dd className="mt-2 text-indigo-600">{id}</dd>
              </dl>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
              >
                {foodItems.map(item => (
                  <li key={item.food_item_id} className="flex space-x-6 py-6">
                    <img
                      alt={item.imageAlt}
                      src={item.imageSrc}
                      className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                        <a href={item.href}>{item.name}</a>
                      </h3>
                      <p>{item.description}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="flex-none font-medium text-gray-900">{`Rs. ${item.price * item.quantity}`}</p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">{`Rs. ${subtotal.toFixed(2)}`}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Delivery</dt>
                  <dd className="text-gray-900">{`Rs. ${delivery}`}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">{`Rs. ${taxes}`}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">{`Rs. ${total.toFixed(2)}`}</dd>
                </div>
              </dl>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <a onClick={handleDashboard} href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Continue ordering on Foodie
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
