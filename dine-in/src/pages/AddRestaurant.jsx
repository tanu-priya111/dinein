import { useState, useEffect } from "react";

const AddRestaurant = () => {
    const [restaurant, setRestaurant] = useState({
        name: "",
        location: "",
        tables: "",
    });

    const [message, setMessage] = useState("");
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch("http://localhost:5000/getRestaurants");
            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/addRestaurant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(restaurant),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Restaurant added successfully!");
                setRestaurant({ name: "", location: "", tables: "" });
                fetchRestaurants();
            } else {
                setMessage(data.message || "Failed to add restaurant.");
            }
        } catch (error) {
            setMessage("Error: Unable to connect to server.");
        }
    };

    return (
        <div style={{
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Add Restaurant</h2>
            {message && <p style={{ textAlign: "center", fontSize: "14px", color: "green", marginBottom: "10px" }}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <input type="text" name="name" placeholder="Restaurant Name" value={restaurant.name} onChange={handleChange} required
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input type="text" name="location" placeholder="Location" value={restaurant.location} onChange={handleChange} required
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input type="number" name="tables" placeholder="Number of Tables" value={restaurant.tables} onChange={handleChange} required
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
                </div>
                <button type="submit" style={{
                    width: "100%", padding: "10px", background: "#28a745", color: "white",
                    fontSize: "18px", border: "none", borderRadius: "5px", cursor: "pointer"
                }}>
                    Add Restaurant
                </button>
            </form>

            <h3 style={{ textAlign: "center", marginTop: "20px" }}></h3>
            <ul style={{ padding: "0", listStyle: "none" }}>
                {restaurants.map((res, index) => (
                    <li key={index} style={{
                        background: "#fff",
                        margin: "10px 0",
                        padding: "10px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
                    }}>
                        <strong>{res.name}</strong> - {res.location} ({res.tables} tables)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddRestaurant;
