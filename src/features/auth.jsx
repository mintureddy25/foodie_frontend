import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you import this for navigation
import { useCustomerLoginMutation, useEateryLoginMutation, useCustomerSignupMutation, useEaterySignupMutation } from "../app/services/authApi"; // Import necessary mutations
import { setCredentials } from "../Utils/AuthSlice";
import { useDispatch } from "react-redux";

export default function Example() {
  // State for managing form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // State for the name input
  const [isLogin, setIsLogin] = useState(true); // For switching between login and signup
  const [isEatery, setIsEatery] = useState(false); // To determine if it's an eatery login/signup
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();

  // Function to toggle between login and signup views
  const handlePage = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  // Function to toggle between customer and eatery login/signup
  const handleRoleChange = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsEatery((prevIsEatery) => !prevIsEatery);
  };

  // Define login mutations for customer and eatery
  const [customerLogin, { isLoading: customerLoading, isSuccess: customerSuccess, isError: customerError }] =
    useCustomerLoginMutation();
  const [eateryLogin, { isLoading: eateryLoading, isSuccess: eaterySuccess, isError: eateryError }] =
    useEateryLoginMutation();
  const [customerSignup, { isLoading: customerSignupLoading, isSuccess: customerSignupSuccess, isError: customerSignupError }] =
    useCustomerSignupMutation();
  const [eaterySignup, { isLoading: eaterySignupLoading, isSuccess: eaterySignupSuccess, isError: eaterySignupError }] =
    useEaterySignupMutation();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      let res;
      const payload = {
        email: email,
        password: password,
        ...(name && !isLogin ? { name: name } : {}), // Include name only if not logging in
      };

      if (isEatery) {
        // Handle eatery login/signup
        res = await (isLogin ? eateryLogin : eaterySignup)(payload).unwrap();
      } else {
        // Handle customer login/signup
        res = await (isLogin ? customerLogin : customerSignup)(payload).unwrap();
      }

      if (res) {
        // Response contains the token and id
        const { token, id } = res;
        dispatch(setCredentials(res));

        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        // Redirect to the dashboard
        if (isEatery){
          navigate(`/Dashboard/eatery/${id}`);
        }else{
          navigate(`/Dashboard/${id}`);

        }
        
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="foodie"
            src="/foodie2.png"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isEatery ? (isLogin ? "Eatery Login" : "Eatery Signup") : (isLogin ? "Customer Login" : "Customer Signup")}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLogin ? (isEatery ? "Eatery Login" : "Customer Login") : (isEatery ? "Eatery Signup" : "Customer Signup")}
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            {isLogin ? "Not an eatery?" : "Already have an account?"}{" "}
            <a
              href="#"
              onClick={handleRoleChange}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {isEatery ? "Switch to Customer" : "Switch to Eatery"}
            </a>
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            {isLogin ? "Not a customer?" : "Already have an account?"}{" "}
            <a
              href="#"
              onClick={handlePage}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? (isEatery ? "Create an Eatery account" : "Create a Customer account") : (isEatery ? "Eatery Login" : "Customer Login")}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
