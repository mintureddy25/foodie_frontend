
import { Route, Routes } from "react-router-dom";
import Dashboard from "./features/dashboard";
import Etery from "./features/eateryPage";
import Cart from "./features/cart";
import OrderSummary from "./features/orderSummary";
import Auth from "./features/auth";
import EateryDashboard from "./features/eatery/dashboard";


export default function App() {
  return (
    <>
      <Routes>
        <Route path='/eatery/:eateryId' element={<Etery />}/>
        <Route path='/auth' element={<Auth />} />
        <Route path='/Dashboard/:customerId' element={<Dashboard />} />
        <Route path='/' element={<Auth />}/>
        <Route path=':customerId/:eateryId/Cart' element={<Cart />} />
        <Route path='/neworder/:orderId' element={<OrderSummary />} />
        <Route path='/Dashboard/eatery/:eateryId' element={<EateryDashboard />} />
       
      </Routes>
    </>
  );
}