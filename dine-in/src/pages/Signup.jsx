import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import restoBg from "../assets/resto.jpg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Regex for validation
  const usernameRegex = /^[A-Za-z0-9\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignup = async () => {
    if (!username) {
      alert("Please enter your username first.");
      return;
    }
    if (!usernameRegex.test(username)) {
      alert("Username can only contain letters, numbers, and spaces.");
      return;
    }
    if (!email) {
      alert("Please enter your email before proceeding.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!password) {
      alert("Please enter your password before proceeding.");
      return;
    }

    // ✅ Fix: use `username` instead of `name`
    const newUser = { username, email, password, role: "user" };

    try {
      const response = await fetch("http://localhost:5000/Signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful");
        navigate("/");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${restoBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-6 max-w-lg bg-white bg-opacity-90 shadow-lg rounded-lg"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Signup with your credentials
          </h1>

          <motion.input
            type="text"
            className="border p-2 rounded w-full mb-3 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              if (!e.target.value || usernameRegex.test(e.target.value)) {
                setUsername(e.target.value);
              } else {
                alert("Username can only contain letters, numbers, and spaces.");
              }
            }}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="email"
            className="border p-2 rounded w-full mb-3 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              if (!username) {
                alert("Please enter your username first.");
              } else {
                setEmail(e.target.value);
              }
            }}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            className="border p-2 rounded w-full mb-3 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              if (!username) {
                alert("Please enter your username first.");
              } else if (!email) {
                alert("Please enter your email first.");
              } else {
                setPassword(e.target.value);
              }
            }}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            onClick={handleSignup}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full transition-all hover:bg-blue-600 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600">
              Login here
            </Link>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Signup;
