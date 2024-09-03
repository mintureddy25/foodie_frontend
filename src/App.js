
import { Route, Routes } from "react-router-dom";
import Mintu from "./mintu";
import Example from "./features/auth";


export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Mintu />}/>
        <Route path='/auth' element={<Example />} />
       
      </Routes>
    </>
  );
}