
import { Route, Routes } from "react-router-dom";
import Mintu from "./mintu";
import Example from "./features/auth";
import Dashboard from "./features/dashboard";


export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Mintu />}/>
        <Route path='/auth' element={<Example />} />
        <Route path='/Dashboard' element={<Dashboard />} />
       
      </Routes>
    </>
  );
}