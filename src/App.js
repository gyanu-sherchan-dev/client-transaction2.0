import "./App.css";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [registerbg, setRegisterbg] = useState("register-layout");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setRegisterbg={setRegisterbg} />} />
          <Route
            path="/register"
            element={<Register registerbg={registerbg} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
