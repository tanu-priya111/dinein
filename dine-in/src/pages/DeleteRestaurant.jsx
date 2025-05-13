import { useState, useEffect } from "react";

const DeleteRestaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurants, setSelectedRestaurants] = useState([]);

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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

        try {
            const response = await fetch(`http://localhost:5000/deleteRestaurant/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                setRestaurants(restaurants.filter((res) => res._id !== id));
                alert("Restaurant deleted successfully!");
            } else {
                alert("Failed to delete restaurant.");
            }
        } catch (error) {
            console.error("Error deleting restaurant:", error);
        }
    };

    const handleSelect = (id) => {
        setSelectedRestaurants((prev) =>
            prev.includes(id) ? prev.filter((resId) => resId !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        if (selectedRestaurants.length === 0) {
            alert("Please select at least one restaurant to delete.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete selected restaurants?")) return;

        try {
            const response = await fetch("http://localhost:5000/deleteMultipleRestaurants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: selectedRestaurants }),
            });

            if (response.ok) {
                setRestaurants(restaurants.filter((res) => !selectedRestaurants.includes(res._id)));
                setSelectedRestaurants([]);
                alert("Selected restaurants deleted successfully!");
            } else {
                alert("Failed to delete selected restaurants.");
            }
        } catch (error) {
            console.error("Error deleting restaurants:", error);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Delete Restaurants</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {restaurants.map((restaurant) => (
                    <li key={restaurant._id} style={{ 
                        padding: "10px", 
                        margin: "10px 0", 
                        background: "#f8f9fa", 
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <input 
                            type="checkbox" 
                            checked={selectedRestaurants.includes(restaurant._id)}
                            onChange={() => handleSelect(restaurant._id)}
                        />
                        <span>{restaurant.name} - {restaurant.location}</span>
                        <button 
                            onClick={() => handleDelete(restaurant._id)} 
                            style={{ 
                                padding: "5px 10px", 
                                background: "red", 
                                color: "white", 
                                border: "none", 
                                cursor: "pointer",
                                borderRadius: "5px"
                            }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button 
                onClick={handleBulkDelete} 
                style={{ 
                    padding: "10px", 
                    background: "darkred", 
                    color: "white", 
                    border: "none", 
                    cursor: "pointer",
                    borderRadius: "5px",
                    display: "block",
                    margin: "auto",
                    marginTop: "10px"
                }}>
                Delete Selected
            </button>
        </div>
    );
};

export default DeleteRestaurant;
