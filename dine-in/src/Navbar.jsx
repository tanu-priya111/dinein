import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <h2>Seamless Dine</h2>
      {user ? (
        <div>
          <span>Welcome, {user.name}!</span>
          <Link to="/booking-history">Booking History</Link>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
