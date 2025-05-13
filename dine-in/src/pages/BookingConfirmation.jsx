import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookingSaved, setBookingSaved] = useState(false);

  const bookingDetails = location.state?.bookingDetails;

  useEffect(() => {
    if (!bookingDetails) {
      navigate("/");
    } else {
      saveBookingToDB();
    }
    setLoading(false);
  }, [bookingDetails, navigate]);

  const saveBookingToDB = async () => {
    try {
      const response = await fetch("http://localhost:5000/confirmBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();
      if (response.ok) {
        setBookingSaved(true);
      } else {
        alert(data.message || "Failed to save booking.");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!bookingDetails) return <p className="text-center text-red-600">No Booking Details Found!</p>;

  const { name, date, time, people, contact, tableNumber, restaurant } = bookingDetails;

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-4 text-center text-green-600">
        🎉 {bookingSaved ? "Booking Confirmed!" : "Processing Booking..."} 🎉
      </h2>
      <p className="text-center mb-6 text-lg">
        {bookingSaved ? "Your table has been successfully booked." : "Please wait..."}
      </p>

      <div className="max-w-lg bg-white p-6 shadow-lg rounded-lg w-full">
        <h3 className="text-2xl font-semibold text-blue-600">📋 Booking Details</h3>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>People:</strong> {people}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Table Number:</strong> {tableNumber}</p>

        <h3 className="text-2xl font-semibold mt-6 text-blue-600">🏠 Restaurant Details</h3>
        <p><strong>Name:</strong> {restaurant.name}</p>
        <p><strong>Location:</strong> {restaurant.location}</p>
        <p><strong>Cost:</strong> {restaurant.cost}</p>
        <p><strong>Rating:</strong> {restaurant.rating}</p>

        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition w-full"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;
