import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurants"; 
import RestaurantDetails from "./pages/RestaurantDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import AddRestaurant from "./pages/AddRestaurant";
import DeleteRestaurant from "./pages/DeleteRestaurant";


const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div>
        <h1 className="text-3xl font-bold text-left my-4 text-blue-600 mt-5 px-10">
          Seamless Dine
        </h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/restaurants" element={<ProtectedRoute element={<Restaurant />} />} />  
          <Route path="/restaurant/:id" element={<ProtectedRoute element={<RestaurantDetails />} />} />
          <Route path="/confirmation/:id" element={<ProtectedRoute element={<BookingConfirmation />} />} />
          <Route path="/addRestaurant" element={<ProtectedRoute element={<AddRestaurant />} />} />
          <Route path="/delete-restaurant" element={<DeleteRestaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
