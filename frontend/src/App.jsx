import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App;