import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import Login from "./components/Login";
import LaptopList from "./components/LaptopList";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/laptops" element={<LaptopList />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
