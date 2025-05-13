// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       alert("Access Denied!");
//       navigate("/");
//     } else {
//       fetchUsers();
//       fetchBookings();
//     }
//   }, [user, navigate]);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/users");
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/bookings");
//       const data = await response.json();
//       setBookings(data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-blue-600">Admin Dashboard</h1>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold text-gray-800">📋 User List</h2>
//         <ul className="bg-white p-4 shadow-md rounded">
//           {users.length > 0 ? (
//             users.map((user) => (
//               <li key={user.id} className="border-b p-2">
//                 {user.name} - {user.email} ({user.role})
//               </li>
//             ))
//           ) : (
//             <p>No users found.</p>
//           )}
//         </ul>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold text-gray-800">📅 Booking List</h2>
//         <ul className="bg-white p-4 shadow-md rounded">
//           {bookings.length > 0 ? (
//             bookings.map((booking) => (
//               <li key={booking.id} className="border-b p-2">
//                 {booking.name} - {booking.restaurant.name} - {booking.date} - {booking.time}
//               </li>
//             ))
//           ) : (
//             <p>No bookings found.</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Admin;
