import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import r1 from "../assets/r1.jpg";
import r2 from "../assets/r2.avif";
import r3 from "../assets/r3.jpg";
import r4 from "../assets/r4.jpg";
import r5 from "../assets/r5.jpg";
import r6 from "../assets/r6.jpg";

// Sample restaurant data
const restaurants = [
  { id: 1, name: "The Spice House", image: r1, location: "Pune", cost: "RS.800 per person", rating: "4.5/5", menu: ["Biryani", "Tandoori Chicken", "Paneer Tikka"] },
  { id: 2, name: "Sushi Haven", image: r2, location: "Mumbai", cost: "RS.900 per person", rating: "4.7/5", menu: ["Sushi", "Ramen", "Miso Soup"] },
  { id: 3, name: "Italiano Delight", image: r3, location: "Chandigarh", cost: "RS.1000 per person", rating: "4.3/5", menu: ["Pizza", "Pasta", "Lasagna"] },
  { id: 4, name: "Burger Nation", image: r4, location: "Gurgaon", cost: "RS.500 per person", rating: "4.1/5", menu: ["Burgers", "Fries", "Shakes"] },
  { id: 5, name: "Chinese Bowl", image: r5, location: "Delhi", cost: "RS.800 per person", rating: "4.4/5", menu: ["Noodles", "Spring Rolls", "Dim Sum"] },
  { id: 6, name: "South Indian Spice", image: r6, location: "Bangalore", cost: "RS.1000 per person", rating: "4.6/5", menu: ["Dosa", "Idli", "Vada"] },
];

function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurants.find((rest) => rest.id === Number(id));

  if (!restaurant) {
    return <h2 className="text-center text-red-500 mt-10">Restaurant not found</h2>;
  }

  const userRole = localStorage.getItem("userRole");

  const [formData, setFormData] = useState({ name: "", date: "", time: "", people: "", contact: "" });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleBooking = () => {
    const tableNumber = Math.floor(Math.random() * 100) + 1;
    const newBooking = { ...formData, tableNumber, restaurant };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));

    navigate(`/confirmation/${restaurant.id}`, { state: { bookingDetails: newBooking } });
  };

  const handleDelete = () => {
    if (userRole === "admin") {
      alert(`Restaurant ${restaurant.name} has been deleted`);
      navigate("/");
    } else {
      alert("Only admins can delete restaurants.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/2 h-screen overflow-hidden">
        <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
      </div>
      <div className="w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mt-6">{restaurant.name}</h2>
        <p className="text-gray-600 mt-2">📍 Location: {restaurant.location}</p>
        <p className="text-gray-600">💰 Cost: {restaurant.cost}</p>
        <p className="text-gray-600">⭐ Rating: {restaurant.rating}</p>

        <h3 className="text-2xl font-semibold mt-6">🍽️ Menu</h3>
        <ul className="list-disc pl-5">
          {restaurant.menu.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>

        {userRole === "admin" && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-3 rounded mt-4 hover:bg-red-700 transition"
          >
            Delete Restaurant
          </button>
        )}

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded mt-4 hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        ) : (
          <div className="mt-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="people"
              placeholder="Number of People"
              value={formData.people}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Info"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            />
            <button
              onClick={handleBooking}
              className="bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-700 transition"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetails;
