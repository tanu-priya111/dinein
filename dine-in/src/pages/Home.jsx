import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Restaurant from "./Restaurants";
import navImage from "../assets/nav.jpg"; 

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    
    if (!loggedInUser) {
      navigate("/");
      return;
    }

    setUser(loggedInUser);

    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);

    fetchRestaurants();
  }, [navigate]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:5000/restaurants"); 
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const deleteBooking = (tableNumber) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.tableNumber !== tableNumber
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Seamless Dine</h1>
        <div className="relative flex items-center space-x-4">
          {user ? (
            <>
              <span>Welcome, <strong>{user.name}!</strong></span>
              <div className="relative">
                <button
                  className="bg-gray-700 px-4 py-2 rounded"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  My Bookings
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg p-3">
                    {bookings.length === 0 ? (
                      <p className="text-gray-600">No bookings yet.</p>
                    ) : (
                      <div className="overflow-y-auto max-h-60">
                        {bookings.map((booking, index) => (
                          <div key={index} className="p-2 border-b">
                            <h3 className="text-sm font-semibold">{booking.restaurant.name}</h3>
                            <p><strong>Date:</strong> {booking.date}</p>
                            <p><strong>Time:</strong> {booking.time}</p>
                            <p><strong>Table No:</strong> {booking.tableNumber}</p>
                            <button
                              onClick={() => deleteBooking(booking.tableNumber)}
                              className="bg-red-500 text-white px-2 py-1 rounded mt-1 hover:bg-red-700 transition text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {user.admin === 1 && (
                <Link
                  to="/addRestaurant"
                  className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Add Restaurant
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/">Login</Link>
          )}
        </div>
      </nav>
      <div
        className="bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-white font-bold"
        style={{ backgroundImage: `url(${navImage})` }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold">Book Your Table Online</h1>
          <p className="mt-2 text-lg font-bold">With us and get up to 20% off!</p>
          <button 
            className="mt-6 bg-red-800 text-white rounded-lg px-6 py-3 hover:bg-red-700 transition"
            onClick={() => {
              console.log("Button clicked, scrolling to restaurant section");
              document.getElementById("restaurant-section").scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Now
          </button>
        </div>
      </div>
      <div id="restaurant-section" className="mt-10">
        <Restaurant restaurants={restaurants} refreshRestaurants={fetchRestaurants} />
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center mt-10">
        <p>&copy; 2025 Seamless Dine. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
