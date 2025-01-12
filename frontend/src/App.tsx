
import { Bounce, ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Auth/Signup"
import Signin from "./pages/Auth/Signin"
import Dashboard from "./pages/Dashboard"



function App() {

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
