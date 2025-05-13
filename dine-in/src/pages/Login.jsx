import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import restoBg from "../assets/resto.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");

        localStorage.setItem("loggedInUser", JSON.stringify(data.user));

        // Navigate based on role
        switch (data.user.role) {
          case "admin":
            navigate("/admin");
            break;
          case "owner":
            navigate("/owner");
            break;
          case "customer":
            navigate("/home");
            break;
          default:
            alert("Unknown role. Redirecting to home.");
            navigate("/home");
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
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
            Login with your credentials
          </h1>

          <motion.input
            type="email"
            className="border p-2 rounded w-full mb-3 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            className="border p-2 rounded w-full mb-3 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full transition-all hover:bg-blue-600 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup here
            </Link>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Login;
