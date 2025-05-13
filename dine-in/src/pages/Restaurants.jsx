import React from "react";
import { Link } from "react-router-dom";
import r1 from "../assets/r1.jpg";
import r2 from "../assets/r2.avif";
import r3 from "../assets/r3.jpg";
import r4 from "../assets/r4.jpg";
import r5 from "../assets/r5.jpg";
import r6 from "../assets/r6.jpg";
import r7 from "../assets/r7.jpg";
import r8 from "../assets/r8.jpg";
import r9 from "../assets/r9.jpg";

const defaultRestaurants = [
  { id: 1, name: "The Spice House", image: r1, location: "Pune", cost: "Rs.800 per person", rating: "4.5/5" },
  { id: 2, name: "Sushi Haven", image: r2, location: "Mumbai", cost: "Rs.900 per person", rating: "4.7/5" },
  { id: 3, name: "Italiano Delight", image: r3, location: "Chandigarh", cost: "Rs.1000 per person", rating: "4.3/5" },
  { id: 4, name: "Mexican Fiesta", image: r4, location: "Delhi", cost: "Rs.1100 per person", rating: "4.6/5" },
  { id: 5, name: "Royal Mughlai", image: r5, location: "Hyderabad", cost: "Rs.1300 per person", rating: "4.9/5" },
  { id: 6, name: "Korean Delight", image: r6, location: "Bangalore", cost: "Rs.1400 per person", rating: "4.8/5" },
  { id: 7, name: "Japanese Curry", image: r7, location: "Mumbai", cost: "Rs.1500 per person", rating: "4.8/5" },
  { id: 8, name: "Thai Garden", image: r8, location: "Ahmedabad", cost: "Rs.1200 per person", rating: "4.9/5" },
  { id: 9, name: "Indian Taste", image: r9, location: "Mumbai", cost: "Rs.800 per person", rating: "4.7/5" }
];

function Restaurant({ restaurants = [] }) {
  const combinedRestaurants = [...defaultRestaurants, ...restaurants];

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Trending Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combinedRestaurants.map((rest) => (
          <div key={rest.id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={rest.image} alt={rest.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{rest.name}</h3>
              <p className="text-gray-600">📍 {rest.location}</p>
              <p className="text-gray-600">💰 {rest.cost}</p>
              <p className="text-gray-600">⭐ {rest.rating}</p>
              <Link to={`/restaurant/${rest.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurant;
